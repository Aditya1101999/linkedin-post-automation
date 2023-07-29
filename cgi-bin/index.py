#!/usr/bin/env python3
import cgi
import openai
import requests
from PIL import Image, ImageDraw, ImageFont
import time

# Set the content type to HTML
print("Content-type: text/html\n")

# todo(right one) OpenAI API key
openai.api_key = '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'

form = cgi.FieldStorage()
post_topic = form.getvalue("post_topic")
target = form.getvalue("target")
num_of_days = form.getvalue("num_of_days")
target_audience = form.getvalue("target_audience")

# adjust prompt
prompt = f"Topic: {post_topic}\nTarget: {target}\nTarget Audience: {target_audience}\nGenerate content for the post:"

def generate_image(post_heading):
    canvas_width = 800
    canvas_height = 400
    rectangle_color = '#0077B5'
    text_color = 'white'

    canvas = Image.new('RGB', (canvas_width, canvas_height), rectangle_color)
    draw = ImageDraw.Draw(canvas)

    font = ImageFont.truetype('arial.ttf', size=30)
    text_width, text_height = draw.textsize(post_heading, font=font)
    text_x = (canvas_width - text_width) // 2
    text_y = (canvas_height - text_height) // 2

    draw.text((text_x, text_y), post_heading, fill=text_color, font=font)

    return canvas

for day in range(1, num_of_days + 1):
    response = openai.Completion.create(
        engine="gpt-3.5-turbo",
        prompt=prompt,
        max_tokens=600,
    )

    generated_content = response['choices'][0]['text']

    # Generate image for the post
    post_heading = generated_content
    image = generate_image(post_heading)

    # Save the image with a unique filename for each day
    output_directory = '/Users/adi/Developer/DevProjects/Python/linkedin-postautomater/generated_images'
    image_path = f"{output_directory}/image_day{day}.png"
    image.save(image_path)

    # Display a confirmation message to the user
    print("<h1>LinkedIn Post Automator - Content Generated</h1>")
    print("<p>Generated Content for Day:", day, ":</p>")
    print("<p>", generated_content, "</p>")
    print("<p>Generated Image for Day:", day, ":</p>")
    print(f'<img src="{image_path}" alt="Generated Image" width="400">')

    # Introduce a 24-hour gap between posts
    if day < num_of_days:
        time.sleep(24 * 60 * 60)  