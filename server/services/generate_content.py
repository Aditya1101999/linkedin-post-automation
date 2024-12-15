from agents.content_generation_agent import content_generation_agent
from agents.critic_agent import critic_agent
from autogen import initiate_chats


def generate_content(user_input):
    support_request = {
        "content": user_input,
        "role": "user",
    }
    chats = [
        {
            "sender": content_generation_agent,
            "recipient": critic_agent,
            "message": support_request["content"],
            "max_turns": 2,
            "clear_history": True
        }
    ]
    chat_results = initiate_chats(chats)
    return chat_results
