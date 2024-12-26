from pydantic_ai import Agent, RunContext
from dotenv import load_dotenv
from ..schemas.dependencies import QueringDeps
from ..schemas.results import QueringResponse
from ..prompts.prompts import QUERING_PROMPT
import os


load_dotenv()
MODEL = os.getenv('MODEL')

quering_agent = Agent(model=MODEL,
                      deps_type=QueringDeps,
                      result_type=QueringResponse)

@quering_agent.system_prompt
def system_prompt(ctx: RunContext[QueringDeps]) -> str:
    user_id = ctx.deps.user_id
    return QUERING_PROMPT.format(user_id=user_id)
