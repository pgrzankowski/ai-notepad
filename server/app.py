from fastapi import FastAPI
from contextlib import asynccontextmanager
from db import create_db_and_tables
from assistant import Assistant
from api.endpoints.auth import router as auth_router
from api.endpoints.notes import router as notes_router
from api.endpoints.assistant import router as assistant_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(auth_router)
app.include_router(notes_router)
app.include_router(assistant_router)
