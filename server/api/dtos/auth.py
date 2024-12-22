from pydantic import BaseModel


class RegisterDTO(BaseModel):
    username: str
    email: str
    password: str


class LoginDTO(BaseModel):
    username: str
    password: str