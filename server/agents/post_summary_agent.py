from autogen import AssistantAgent
from config.development import LLM_CONFIG

post_summary_agent = AssistantAgent(
    name="Post Summary Agent",
    system_message='''
    You are a sentiment analysis expert specializing in interpreting social media comments.
    Analyze LinkedIn comments for sentiments (positive, negative, neutral) and assess the mood.
    Provide a sentiment breakdown with the ratio of positive to negative comments.
    ''',
    llm_config=LLM_CONFIG,
)
