from autogen import AssistantAgent
from config.development import LLM_CONFIG

content_generation_agent = AssistantAgent(
    name="LinkedIn Content Agent",
    system_message='''
    You are a professional assistant specialized in writing LinkedIn posts, NOT giving suggestions.
    Your task is to directly generate the LinkedIn post content based on the user's input.
    Ensure the posts are well-written, concise, engaging, and tailored to a professional audience.
    Avoid offering advice or suggestions. Just provide the actual post content ready for the user to publish.
    ''',
    llm_config=LLM_CONFIG,
    max_consecutive_auto_reply=2,
    human_input_mode="NEVER"
)
