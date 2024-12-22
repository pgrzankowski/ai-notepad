from fastapi import APIRouter
from fastapi.responses import JSONResponse
from db.database import SessionDep
from api.dtos.assistant import AssistantDTO
from assistant import Assistant


router = APIRouter(prefix="/assistant", tags=["assistant"])

@router.post("/{username}")
async def get_response(username: str, data: AssistantDTO, session: SessionDep):
    assistant = Assistant()
    response = await assistant.get_response(data.question,
                                            username,
                                            session)
    print(response)
    
    return JSONResponse({"response": f"{response}!"})
