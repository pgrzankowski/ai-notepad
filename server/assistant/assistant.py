from pydantic_ai import Agent, RunContext
from .schemas import AssistantDeps
from .prompts import SYSTEM_PROMPT
from .tools import call_querry_agent


class Assistant:
    def __init__(self):
        self._agent = self._setup_agent()

    def _setup_agent(self):
        agent = Agent(model='gemini-1.5-flash',
                      deps_type=AssistantDeps,
                      tools=[call_querry_agent])
        
        @agent.system_prompt
        def system_prompt(ctx: RunContext[AssistantDeps]) -> str:
            username = ctx.deps.username
            return SYSTEM_PROMPT.format(username=username)
        return agent
        
    async def get_response(self, user_input, user_id, username, session):
        deps=AssistantDeps(user_id=user_id,
                           username=username,
                           session_dep=session)
        result = await self._agent.run(user_input,
                                       deps=deps)
        return result.data
    

