#!/usr/bin/env python3
import cgi
import requests
import openai
import time
from PIL import Image, ImageDraw, ImageFont

print("Content-type: text/html\n")

#openai api key

form = cgi.FieldStorage()
post_topic = form.getvalue("post_topic")
target = form.getvalue("target")
num_of_days = form.getvalue("num_of_days")
num_of_days = int(num_of_days) if num_of_days is not None else 1
target_audience = form.getvalue("target_audience")

prompt = f"You are an expert technical content writer who focuses on LinkedIn Post. Each post must be under 600 characters. Write about: Topic: {post_topic}\nTarget: {target}\nTarget Audience: {target_audience}\nGenerate content for the post:"
imageprompt=f"You are an expert image designer who focuses on to make images for LinkedIn Post. Each image will be having a rectangular light colored box in between with the post topic written in it. Generate an image on: Topic: {post_topic}\nTarget: {target}\nTarget Audience: {target_audience}\nGenerate image for the post:"

def generate_image(imageprompt):
    response = openai.Image.create(
        imagePrompt=imageprompt,
        n=1,
        size="512x512",
    )

    if "data" in response and isinstance(response["data"], list) and len(response["data"]) > 0:
        image_data = response["data"][0]
        image_url = image_data.get("url")
        if image_url:
            image = Image.open(requests.get(image_url, stream=True).raw)
            return image

    return None


def post_to_linkedin(content, image_path):
    access_token = "AQUBG24c4wfGa6E1POfHnKcd4WzwVyiCMYaavcpQGjshUJdGatDZzkTM6XvkFhaIqz7XCaY0z-dZMuzXmmaEOGwoabxuk1olxIZEUXZ1mgBeTlmT7LDiYbw2H5kYzcWC0qn2ylFxlaN2AzxMFUMVF0RwU3Uez8mUG2R4uIsyylYwoDuXK2OpcW42ZPceiDLQYfTrC2S5z29uYeIlmD-Xc3dcHvbGFTo4TkPuPZd1OoocJpgykKxDuDZhJSyHxMhGy5SuHcO1YFPj-rHGaqTSdg4R5adaFxE0vMAvd8HUzdQPdQFHFr6_H0WEG8lEmEyjmhKi301YWUj6hvRVVXCROW5Njb-tjA"
    profile_id = "testing-sols"  
    url = f"https://api.linkedin.com/v2/ugcPosts"
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json",
    }

    post_data = {
        "author": f"urn:li:person:{profile_id}",
        "lifecycleState": "PUBLISHED",
        "specificContent": {
            "com.linkedin.ugc.ShareContent": {
                "shareCommentary": {
                    "text": content,
                },
                "shareMediaCategory": "IMAGE",
                "media": [
                    {
                        "status": "READY",
                        "description": {"text": content},
                        "media": image_path,
                    }
                ],
            }
        },
        "visibility": {"com.linkedin.ugc.MemberNetworkVisibility": "CONNECTIONS"},
    }

    try:
        response = requests.post(url, json=post_data, headers=headers)
        response.raise_for_status()
        print(f"Successfully posted on LinkedIn: {response.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Error posting on LinkedIn: {e}")


image = generate_image(imageprompt)

try:
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ],
    )
except Exception as e:
    print("Error:", e)

if response is not None:
    generated_content = response['choices'][0]['message']['content']

# Get the generated content from the response
generated_content = response['choices'][0]['message']['content']

# Save the generated content to a file
output_directory = './generated_images'
for day in range(1, num_of_days + 1):
    post_heading = generated_content
    image = generate_image(post_heading)

    image_path = f"{output_directory}/image_day{day}.png"
    image.save(image_path)

    # Print the generated content and image for each day to the console
    print("<h1>LinkedIn Post Automator - Content Generated</h1>")
    print("<p>Generated Content for Day:", day, ":</p>")
    print("<p>", generated_content, "</p>")
    print("<p>Generated Image for Day:", day, ":</p>")
    print(f'<img src="{image_path}" alt="Generated Image" width="400">')

    # Save the generated content to a file for each day
    output_filename = f'cgi-bin/result_day{day}.txt'  # Replace with the desired output file path
    with open(output_filename, 'w', encoding='utf-8') as f:
        f.write(generated_content)

    # Post to LinkedIn
    post_to_linkedin(generated_content, image_path)

    if day < num_of_days:
        time.sleep(24 * 60 * 60)

try:
    print("Location: /result_page.html\n")
except Exception as e:
    print("Error:", e)

