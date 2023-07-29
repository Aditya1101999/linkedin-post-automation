#!/usr/bin/env python3
import cgi

# Set the content type to HTML
print("Content-type: text/html\n")

# Retrieve form data
form = cgi.FieldStorage()
post_topic = form.getvalue("post_topic")
target = form.getvalue("target")
num_of_days = form.getvalue("num_of_days")
target_audience = form.getvalue("target_audience")

print("<h1>LinkedIn Post Automator - Form Submission</h1>")
print("<p>Post Topic:", post_topic, "</p>")
print("<p>Target:", target, "</p>")
print("<p>Number of Days:", num_of_days, "</p>")
print("<p>Target Audience Type:", target_audience, "</p>")
