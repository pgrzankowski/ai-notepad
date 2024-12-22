from fastapi import APIRouter
from ..services.notes import (get_notes,
                              create_note,
                              get_note,
                              update_note,
                              delete_note)
from ..dtos.notes import NoteDTO
from db.database import SessionDep


router = APIRouter(prefix="/note", tags=["note"])

@router.get("/{username}")
async def get_notes_endpoint(username: str, session: SessionDep):
    return get_notes(username, session)

@router.post("/{username}")
async def create_note_endpoint(username: str, data: NoteDTO, session: SessionDep):
    return create_note(username, data, session)

@router.get("/{username}/{note_id}")
async def get_note_endpoint(username: str, note_id: int, session: SessionDep):
    return get_note(username, note_id, session)

@router.put("/{username}/{note_id}")
async def update_note_endpoint(username: str, note_id: int, data: NoteDTO, session: SessionDep):
    return update_note(username, note_id, data, session)

@router.delete("/{username}/{note_id}")
async def delete_note_endpoint(username: str, note_id: int, session: SessionDep):
    return delete_note(username, note_id, session)
