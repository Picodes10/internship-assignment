import sys
from reddit_scraper import extract_username, get_user_data
from persona_builder import generate_persona
import os

def save_persona(username, persona_text):
    os.makedirs("output", exist_ok=True)
    file_path = f"output/{username}_persona.txt"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(persona_text)
    print(f"Persona saved to {file_path}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python main.py <RedditProfileURL>")
        sys.exit(1)

    url = sys.argv[1]
    username = extract_username(url)
    posts, comments = get_user_data(username)
    persona = generate_persona(posts, comments)
    save_persona(username, persona)
