from autogen_agentchat.agents import AssistantAgent
from config.development import model_client

critic_agent = AssistantAgent(
    name="critic",
    system_message=""" You need to improve the post content you saw.
    How to create content that is better in terms of clarity, engagement, and professionalism.Respond with 'APPROVE' to when your feedbacks are addressed.
    """,
    model_client=model_client,
)
