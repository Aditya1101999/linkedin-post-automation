from linkedin_api import Linkedin
from agents.post_summary_agent import post_summary_agent
from config.development import EMAIL, PASSWORD

api = Linkedin(EMAIL, PASSWORD)

def get_comments(post_url):
    post_comments = api.get_post_comments(post_url, comment_count=10)
    comments = [comment['comment']['values'][0]['value'] for comment in post_comments if 'comment' in comment]
    return comments

def post_summary(post_url):
    comments = get_comments(post_url)
    support_request = {"role": "user", "content": "\n".join(comments)}
    reply = post_summary_agent.generate_reply(messages=[support_request])
    return reply
