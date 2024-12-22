from pydantic_ai import Agent
from .schemas import AssistantDeps, AssistantResult
from .prompts import system_prompt
from .tools import (get_all_notes,
                    create_note)


class Assistant:
    def __init__(self):
        self._agent = self._setup_agent()

    def _setup_agent(self):
        agent = Agent('ollama:llama3.2',
                      deps_type=AssistantDeps,
                    #   result_type=AssistantResult,
                      system_prompt=system_prompt,
                      tools=[get_all_notes, create_note])
        return agent
    
    async def get_response(self, user_input, username, session):
        deps=AssistantDeps(username=username,
                           session_dep=session)
        result = await self._agent.run(user_input,
                                       deps=deps)
        return result.data
    

