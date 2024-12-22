from pydantic_ai import RunContext
from .schemas import AssistantDeps
from api.services.auth import get_user
from db.models import Note


def get_all_notes(ctx: RunContext[AssistantDeps]):
    """
    Tool to get all notes for a user
    """
    session = ctx.deps.session_dep
    username = ctx.deps.username
    user = get_user(username, session)
    notes = user.notes
    if not notes:
        connected_notes = "This user doesn't have any notes."
    else:
        connected_notes = ""
    for note in notes:
        connected_notes += f"Note:\nTitle: {note.title}:\nContent: {note.content}\n\n"
    print(connected_notes)
    return connected_notes

def create_note(ctx: RunContext[AssistantDeps]):
    """
    Tool to create a note for a user
    """
    session = ctx.deps.session_dep
    username = ctx.deps.username
    user = get_user(username, session)
    new_note = Note(title="AI Gen Note",
                    content="AI Gen Content",
                    user_id=user.id)
    session.add(new_note)
    session.commit()
    session.refresh(new_note)
    return f"Note: '{new_note.title}' created successfully"
