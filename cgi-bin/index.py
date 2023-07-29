#!/usr/bin/env python3
import cgi
import openai
import requests
from PIL import Image, ImageDraw, ImageFont

# Set the content type to HTML
print("Content-type: text/html\n")

# todo(sahi wala :) OpenAI API key
openai.api_key = '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'

form = cgi.FieldStorage()
post_topic = form.getvalue("post_topic")
target = form.getvalue("target")
num_of_days = form.getvalue("num_of_days")
target_audience = form.getvalue("target_audience")

# prommpt adjust
prompt = f"Topic: {post_topic}\nTarget: {target}\nGenerate content for the post:"


response = openai.Completion.create(
    engine="text-davinci-002",  # engine name of key
    prompt=prompt,
    max_tokens=600,  # linkedin limit
)

generated_content = response['choices'][0]['text']

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

post_heading = generated_content  
image = generate_image(post_heading)
image.save('/path/to/save/image.png')  #update path

print("<h1>LinkedIn Post Automator - Content Generated</h1>")
print("<p>Generated Content:</p>")
print("<p>", generated_content, "</p>")
