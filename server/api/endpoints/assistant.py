from fastapi import APIRouter
from fastapi.responses import JSONResponse
from db.database import SessionDep
from api.dtos.assistant import AssistantDTO
from api.services.auth import get_user
from assistant import Assistant


router = APIRouter(prefix="/assistant", tags=["assistant"])

@router.post("/{username}")
async def get_response(username: str, data: AssistantDTO, session: SessionDep):
    user = get_user(username, session)
    if not user:
        return JSONResponse({"error": "User not found"}, status_code=404)
    assistant = Assistant()
    response = await assistant.get_response(data.question,
                                            user.id,
                                            username,
                                            session)
    print(response)
    
    return JSONResponse({"response": f"{response}!"})
