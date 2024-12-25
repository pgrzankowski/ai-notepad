from dataclasses import dataclass
from pydantic import BaseModel, Field
from db.database import SessionDep


@dataclass
class AssistantDeps:
    user_id: int
    username: str
    session_dep: SessionDep

class AssistantResult(BaseModel):
    response: str = Field(description="The response from the assistant")


@dataclass
class QueringDeps:
    user_id: int

class QueringResponse(BaseModel):
    query: str = Field(description="The SQL query to be executed")