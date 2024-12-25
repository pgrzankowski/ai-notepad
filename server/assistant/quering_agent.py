from pydantic_ai import Agent, RunContext
from .schemas import QueringDeps, QueringResponse
from .prompts import QUERING_PROMPT
from dotenv import load_dotenv

load_dotenv()

quering_agent = Agent(model='gemini-1.5-flash',
                      deps_type=QueringDeps,
                      result_type=QueringResponse)

@quering_agent.system_prompt
def system_prompt(ctx: RunContext[QueringDeps]) -> str:
    user_id = ctx.deps.user_id
    return QUERING_PROMPT.format(user_id=user_id)
