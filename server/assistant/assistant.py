from .agents.chat_agent import chat_agent
from .agents.chat_agent import ChatDeps


class Assistant:
    def __init__(self):
        self._agent = chat_agent
        
    async def get_response(self, user_input, user_id, username, session):
        deps=ChatDeps(user_id=user_id,
                           username=username,
                           session_dep=session)
        result = await self._agent.run(user_input,
                                       deps=deps)
        # response = result.data.response
        response = result.data
        print(type(response))
        return response.rstrip('!\n')
    

