from dataclasses import dataclass
from db.database import SessionDep


@dataclass
class ChatDeps:
    user_id: int
    username: str
    session_dep: SessionDep

@dataclass
class QueringDeps:
    user_id: int
