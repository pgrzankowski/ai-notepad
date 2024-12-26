from pydantic import BaseModel, Field


class ChatResult(BaseModel):
    response: str = Field(description="The response from the assistant")

class QueringResponse(BaseModel):
    query: str = Field(description="The SQL query to be executed")
