from fastapi import HTTPException
from fastapi.responses import JSONResponse
from db.models import Note
from db.database import SessionDep
from ..dtos.notes import NoteDTO
from sqlmodel import select
from .auth import get_user


def get_notes(username: str, session: SessionDep):
    user = get_user(username, session)
    if not user:
        raise HTTPException(status_code=404,
                            detail="User not found")
    return user.notes

def create_note(username: str, data: NoteDTO, session: SessionDep):
    user = get_user(username, session)
    if not user:
        raise HTTPException(status_code=404,
                            detail="User not found")
    new_note = Note(title=data.title, content=data.content, user_id=user.id)
    session.add(new_note)
    session.commit()
    session.refresh(new_note)
    return JSONResponse({"message": f"Note: '{new_note.title}' created successfully"})

def get_note(username: str, note_id: int, session: SessionDep):
    user = get_user(username, session)
    if not user:
        raise HTTPException(status_code=404,
                            detail="User not found")
    statement = select(Note).where(Note.id == note_id and Note.user_id == user.id)
    note = session.exec(statement).first()
    if not note:
        raise HTTPException(status_code=404,
                            detail="Note not found")
    return JSONResponse(note.model_dump())

def update_note(username: str, note_id: int, data: NoteDTO, session: SessionDep):
    user = get_user(username, session)
    if not user:
        raise HTTPException(status_code=404,
                            detail="User not found")
    statement = select(Note).where(Note.id == note_id and Note.user_id == user.id)
    note_to_update = session.exec(statement).first()
    if not note_to_update:
        raise HTTPException(status_code=404,
                            detail="Note not found")
    note_to_update.title = data.title
    note_to_update.content = data.content
    session.add(note_to_update)
    session.commit()
    session.refresh(note_to_update)
    return JSONResponse({"message": f"Note: '{note_to_update.title}' updated successfully"})

def delete_note(username: str, note_id: int, session: SessionDep):
    user = get_user(username, session)
    if not user:
        raise HTTPException(status_code=404,
                            detail="User not found")
    statement = select(Note).where(Note.id == note_id and Note.user_id == user.id)
    note_to_delete = session.exec(statement).first()
    if not note_to_delete:
        raise HTTPException(status_code=404,
                            detail="Note not found")
    title = note_to_delete.title
    session.delete(note_to_delete)
    session.commit()
    return JSONResponse({"message": f"Note '{title}' deleted successfully"})
    