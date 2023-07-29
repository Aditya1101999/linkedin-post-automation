#!/usr/bin/env python3
import cgi
import openai
import time
from PIL import Image, ImageDraw, ImageFont

print("Content-type: text/html\n")

openai.api_key = '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'

form = cgi.FieldStorage()
post_topic = form.getvalue("post_topic")
target = form.getvalue("target")
num_of_days = form.getvalue("num_of_days")
num_of_days = int(num_of_days) if num_of_days is not None else 1
target_audience = form.getvalue("target_audience")

prompt = f"Topic: {post_topic}\nTarget: {target}\nTarget Audience: {target_audience}\nGenerate content for the post:"

def generate_image(post_heading):
    canvas_width = 800
    canvas_height = 400
    rectangle_color = '#0077B5'
    text_color = 'white'

    canvas = Image.new('RGB', (canvas_width, canvas_height), rectangle_color)
    draw = ImageDraw.Draw(canvas)

    try:
        font = ImageFont.truetype('arial.ttf', size=30)
    except IOError:
        font = ImageFont.load_default()

    text_width, text_height = draw.textsize(post_heading, font=font)
    text_x = (canvas_width - text_width) // 2
    text_y = (canvas_height - text_height) // 2

    draw.text((text_x, text_y), post_heading, fill=text_color, font=font)

    return canvas


# Generate the OpenAI response
response = openai.ChatCompletion.create(  
    model="gpt-3.5-turbo",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt},
    ],
)

# Get the generated content from the response
generated_content = response['choices'][0]['message']['content']

# Save the generated content to a file
output_directory = '/Users/adi/Developer/DevProjects/Python/linkedin-postautomater/generated_images'
for day in range(1, num_of_days + 1):
    post_heading = generated_content
    image = generate_image(post_heading)

    image_path = f"{output_directory}/image_day{day}.png"
    image.save(image_path)

    print("<h1>LinkedIn Post Automator - Content Generated</h1>")
    print("<p>Generated Content for Day:", day, ":</p>")
    print("<p>", generated_content, "</p>")
    print("<p>Generated Image for Day:", day, ":</p>")
    print(f'<img src="{image_path}" alt="Generated Image" width="400">')

    if day < num_of_days:
        time.sleep(24 * 60 * 60)

# Save the generated content to a file
output_filename = 'cgi-bin/result.txt'  # Replace with the desired output file path
with open(output_filename, 'w') as f:
    f.write(generated_content)

# Now, redirect the user to the result page (result_page.html)
# Append any relevant query parameters to the URL if needed
print(f"Location: result_page.html\n")
