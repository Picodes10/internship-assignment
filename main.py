import sys
import os
from reddit_scraper import extract_username, get_user_data
from persona_builder import generate_persona_with_citations

def save_persona(username: str, persona_text: str) -> None:
    """Save the generated persona to a text file"""
    os.makedirs("output", exist_ok=True)
    file_path = f"output/{username}_persona.txt"
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(persona_text)
    
    print(f"Persona saved to {file_path}")
    print(f"File size: {len(persona_text)} characters")

def main():
    """Main function to run the Reddit persona generator"""
    
    # Check command line arguments
    if len(sys.argv) != 2:
        print("Usage: python main.py <RedditProfileURL>")
        print("Example: python main.py https://www.reddit.com/user/kojied/")
        sys.exit(1)
    
    url = sys.argv[1]
    
    try:
        # Extract username from URL
        print(f"Extracting username from: {url}")
        username = extract_username(url)
        print(f"Username: {username}")
        
        # Scrape user data
        print(f"Scraping data for u/{username}...")
        posts, comments = get_user_data(username)
        
        print(f"Found {len(posts)} posts and {len(comments)} comments")
        
        if not posts and not comments:
            print("No data found. User may be private or deleted.")
            return
        
        # Generate persona
        print("Generating user persona...")
        persona = generate_persona_with_citations(username, posts, comments)
        
        # Save to file
        save_persona(username, persona)
        
        print("Persona generation completed successfully!")
        
    except ValueError as e:
        print(f"Error: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"Unexpected error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
