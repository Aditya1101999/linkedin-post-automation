from PIL import Image, UnidentifiedImageError
import io
import requests
from agents.prompt_improver_agent import prompt_improver_agent
from agents.critic_agent import critic_agent
from config.development import HUGGINGFACE_API_URL, get_headers

def query(payload):
    response = requests.post(HUGGINGFACE_API_URL, headers=get_headers(), json=payload)
    if response.status_code != 200:
        raise Exception(f"Request failed: {response.status_code}, {response.text}")
    return response.content

def generate_image(user_input):
    support_request = {"content": user_input, "role": "user"}
    updated_query = prompt_improver_agent.generate_reply(messages=[support_request])
    final_prompt = updated_query['content']

    updated_query_second = critic_agent.generate_reply(messages=[{"content": final_prompt, "role": "user"}])
    final_prompt_second = updated_query_second['content']

    image_bytes = query({"inputs": str(final_prompt_second)})

    try:
        image = Image.open(io.BytesIO(image_bytes))
        image.save("generated_image.png")
    except UnidentifiedImageError:
        print("The response is not a valid image. Here's the content of the response:")
        print(image_bytes.decode("utf-8"))

