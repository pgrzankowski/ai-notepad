from pydantic_ai import RunContext
from .schemas import AssistantDeps, QueringDeps
from .quering_agent import quering_agent
from sqlmodel import text


async def call_querry_agent(ctx: RunContext[AssistantDeps], user_input: str) -> str:
    """
    Tool to call the quering agent, which creates SQL queries, and execute the querry.
    user_input: str
    """
    quering_deps = QueringDeps(user_id=ctx.deps.user_id)
    result: str = await quering_agent.run(user_input,
                                         deps=quering_deps)
    print(result.data)
    query = result.data.query
    query = query.rstrip('!').replace('\\', '')
    session = ctx.deps.session_dep
    if query.startswith('INSERT') or query.startswith('UPDATE') or query.startswith('DELETE'):
        session.exec(text(query))
        response = f"Done! Query used: {query}"
    elif query.startswith('SELECT'):
        query_result = session.exec(text(query))
        print(query_result)
        rows = query_result.fetchall()
        print(rows)
        response = f"Query used: {query}\n"
        if not rows:
            response += "No results found"
        else:
            for row in rows:
                for item in row:
                    response += f"{item}, "
                response = response.rstrip(', ') + '\n'
    else:
        response = f"Unauthorized query: {query}"
    
    print(query)
    print(response)
    session.commit()
    return response
