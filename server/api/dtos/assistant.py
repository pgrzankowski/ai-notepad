from pydantic import BaseModel


class AssistantDTO(BaseModel):
    question: str
