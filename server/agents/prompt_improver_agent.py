from autogen import AssistantAgent
from config.development import LLM_CONFIG

prompt_improver_agent = AssistantAgent(
    name="Prompt Improver Agent",
    system_message='''
    You are a professional assistant specialized in generating prompts for image creation, not giving suggestions.
    Your task is to directly generate detailed, descriptive prompts for image generation based on the user's input.
    Ensure that the prompts include vivid descriptions, context, and any necessary visual details to guide the creation of high-quality images. Give only one option, no multiple options.
    Avoid offering advice or feedback—just provide the final, ready-to-use image prompts.
    ''',
    llm_config=LLM_CONFIG,
    max_consecutive_auto_reply=1,
    human_input_mode="NEVER"
)
