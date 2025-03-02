import os

import dotenv
from autogen_core.models import ModelFamily
from autogen_ext.models.openai import OpenAIChatCompletionClient

# Load environment variables from .env
dotenv.load_dotenv('./.env')

# API Keys and other constants
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
PERSON_URN_KEY = os.getenv('PERSON_URN_KEY')
ACCESS_TOKEN = os.getenv('ACCESS_TOKEN')
HUGGINGFACE_API_KEY = os.getenv('HUGGINGFACE_API_KEY')
EMAIL = os.getenv('EMAIL')
PASSWORD = os.getenv('PASSWORD')

# API URLs
HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev"
LINKEDIN_API_URL = "https://api.linkedin.com/v2"

# Headers for API requests
headers = {
    "Authorization": f"Bearer {HUGGINGFACE_API_KEY}",
}
def get_headers(content_type=None):
    headers = headers.copy()
    if content_type:
        headers["Content-Type"] = content_type
    return headers

# LLM Configuration
model_client = OpenAIChatCompletionClient(
    model="qwen-2.5-32b",
    base_url="https://api.groq.com/openai/v1",
    api_key=GROQ_API_KEY,
    model_info={
        "vision": False,
        "function_calling": False,
        "json_output": False,
        "family": ModelFamily.is_gemini,
    },
)


LLM_CONFIG = {"model": "gemma2-9b-it", "api_key": GROQ_API_KEY, "api_type": "groq"}
