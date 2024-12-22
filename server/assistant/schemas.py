from dataclasses import dataclass
from pydantic import BaseModel, Field
from db.database import SessionDep


@dataclass
class AssistantDeps:
    username: str
    session_dep: SessionDep

class AssistantResult(BaseModel):
    response: str = Field(description="The response from the assistant")