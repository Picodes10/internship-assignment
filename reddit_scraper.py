import praw
import re
import os
from dotenv import load_dotenv
from typing import List, Tuple

# Load environment variables
load_dotenv()

# Extract username from Reddit profile URL
def extract_username(url: str) -> str:
    match = re.search(r'/user/([^/]+)', url)
    if match:
        return match.group(1)
    else:
        raise ValueError(f"Invalid Reddit URL format: {url}")

# Initialize Reddit API
def init_reddit():
    return praw.Reddit(
        client_id=os.getenv('REDDIT_CLIENT_ID'),
        client_secret=os.getenv('REDDIT_CLIENT_SECRET'),
        user_agent=os.getenv('REDDIT_USER_AGENT', 'UserPersonaBuilder/1.0')
    )

# Function to get user data from Reddit
def get_user_data(username: str) -> Tuple[List[dict], List[dict]]:
    reddit = init_reddit()
    
    try:
        user = reddit.redditor(username)
        
        # Get posts with metadata
        posts = []
        try:
            for submission in user.submissions.new(limit=50):
                post_data = {
                    'title': submission.title,
                    'content': submission.selftext,
                    'subreddit': str(submission.subreddit),
                    'score': submission.score,
                    'created_utc': submission.created_utc,
                    'url': submission.url,
                    'permalink': f"https://reddit.com{submission.permalink}"
                }
                posts.append(post_data)
        except Exception as e:
            print(f"Error fetching posts: {e}")
        
        # Get comments with metadata
        comments = []
        try:
            for comment in user.comments.new(limit=100):
                comment_data = {
                    'body': comment.body,
                    'subreddit': str(comment.subreddit),
                    'score': comment.score,
                    'created_utc': comment.created_utc,
                    'permalink': f"https://reddit.com{comment.permalink}"
                }
                comments.append(comment_data)
        except Exception as e:
            print(f"Error fetching comments: {e}")
        
        return posts, comments
    
    except Exception as e:
        print(f"Error accessing user {username}: {e}")
        return [], []
    