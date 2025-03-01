from agents.content_generation_agent import content_generation_agent
from agents.critic_agent import critic_agent
from autogen_agentchat.conditions import TextMentionTermination
from autogen_agentchat.teams import RoundRobinGroupChat

text_termination = TextMentionTermination("APPROVE")


async def generate_content(user_input: str):
    team = RoundRobinGroupChat(
        [content_generation_agent, critic_agent], termination_condition=text_termination
    )
    result = await team.run(task=user_input)
    return result
