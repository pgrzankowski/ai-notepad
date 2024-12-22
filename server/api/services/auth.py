from ..dtos import RegisterDTO, LoginDTO
from db.database import SessionDep
from db.models import User
from hashlib import sha256
from sqlmodel import select
from datetime import timedelta, datetime
import jwt
import os
from dotenv import load_dotenv, find_dotenv


load_dotenv(find_dotenv())

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

def get_user(username: str, session: SessionDep):
    statement = select(User).where(User.username == username)
    return session.exec(statement).first()

def create_user(user: RegisterDTO, session: SessionDep):
    hashed_password = sha256(user.password.encode()).hexdigest()
    new_user = User(username=user.username,
                    email=user.email,
                    password=hashed_password)
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

def create_access_token(data: dict, expire_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.now() + expire_delta
    to_encode.update({"exp": expire})
    access_token = jwt.encode(to_encode, SECRET_KEY, ALGORITHM)
    return access_token
