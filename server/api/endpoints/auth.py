from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from db.database import SessionDep
from ..dtos import RegisterDTO, LoginDTO
from ..services.auth import create_user, get_user, create_access_token
from datetime import timedelta


router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/signup", status_code=201)
async def signup(user: RegisterDTO, session: SessionDep):
    new_user = get_user(user.username, session)
    if new_user:
        raise HTTPException(status_code=400,
                            detail=f"User '{user.username} already exists")
    create_user(user, session)
    return JSONResponse({"message": "User created successfully"})

@router.post("/login", status_code=200)
async def login(user: LoginDTO, session: SessionDep):
     db_user = get_user(user.username, session)
     if not db_user:
        raise HTTPException(status_code=400,
                            detail='Incorrect email or password')
     access_token = create_access_token({"sub": user.username},
                                        timedelta(minutes=15))
     return JSONResponse({"access_token": access_token})
