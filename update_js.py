import json
import re

json_path = 'extracted_books.json'
js_path = r'src\data\cvData.js'

with open(json_path, 'r', encoding='utf-8') as f:
    books_data = json.load(f)

# Convert books_data to JavaScript string format
books_str = json.dumps(books_data, indent=4)
# Adjust indentation to match cvData.js (2 spaces base, inside array means +2 spaces)
books_str = books_str.replace('\n', '\n  ')

with open(js_path, 'r', encoding='utf-8') as f:
    js_content = f.read()

# Replace the publications array
# Match from "  publications: [" to the matching "]," before "training:"
pattern = re.compile(r'(  publications:\s*\[).*?(\n  \],\n  training:)', re.DOTALL)

def replace_func(match):
    # The JSON dump is already an array "[...]", so we strip the outer brackets
    inner_content = books_str.strip()[1:-1].strip()
    return f"{match.group(1)}\n    {inner_content}\n  ],\n  training:"

new_js_content = pattern.sub(replace_func, js_content)

with open(js_path, 'w', encoding='utf-8') as f:
    f.write(new_js_content)

print("Updated cvData.js successfully!")
