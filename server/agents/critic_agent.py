from autogen import ConversableAgent
from config.development import LLM_CONFIG
from utils.utils import is_termination_message


critic_agent = ConversableAgent(
    name="Critic Agent",
    llm_config=LLM_CONFIG,
    system_message='''
    You need to improve the post content you saw.
    How to create content that is better in terms of clarity, engagement, and professionalism.
    Reply with the following format:

   CRITICS: the content needs to improve...
   PROMPT: here is the updated content!

   If you have no critique or a prompt, just say TERMINATE
   ''',
    max_consecutive_auto_reply=2,
    human_input_mode="NEVER",
    is_termination_msg=is_termination_message,
)
