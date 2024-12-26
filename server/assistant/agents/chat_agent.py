from pydantic_ai import Agent, RunContext
from dotenv import load_dotenv
from ..schemas.dependencies import ChatDeps
from ..schemas.results import ChatResult
from ..tools.tools import call_querry_agent
from ..prompts.prompts import SYSTEM_PROMPT
import os


load_dotenv()
MODEL = os.getenv('MODEL')

chat_agent = Agent(model=MODEL,
                      deps_type=ChatDeps,
                    #   result_type=ChatResult,
                      tools=[call_querry_agent])

@chat_agent.system_prompt
def system_prompt(ctx: RunContext[ChatDeps]) -> str:
    username = ctx.deps.username
    return SYSTEM_PROMPT.format(username=username)
