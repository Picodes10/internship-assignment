import os
import json
from collections import Counter
from typing import List, Dict, Any
from datetime import datetime
import re
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Extract Reddit user data
def analyze_basic_patterns(posts: List[dict], comments: List[dict]) -> Dict[str, Any]:
    # Combine all text content
    all_text = []
    for post in posts:
        all_text.append(post['title'])
        if post['content']:
            all_text.append(post['content'])
    
    for comment in comments:
        all_text.append(comment['body'])
    
    combined_text = ' '.join(all_text).lower()
    
    # Analyze subreddit activity
    subreddits = []
    for post in posts:
        subreddits.append(post['subreddit'])
    for comment in comments:
        subreddits.append(comment['subreddit'])
    
    subreddit_counts = Counter(subreddits)
    
    # Analyze posting patterns
    post_times = [datetime.fromtimestamp(post['created_utc']) for post in posts]
    comment_times = [datetime.fromtimestamp(comment['created_utc']) for comment in comments]
    
    # Basic sentiment analysis (simple approach)
    positive_words = ['good', 'great', 'awesome', 'love', 'like', 'amazing', 'excellent', 'fantastic']
    negative_words = ['bad', 'hate', 'terrible', 'awful', 'sucks', 'worst', 'horrible', 'disappointing']
    
    positive_count = sum(combined_text.count(word) for word in positive_words)
    negative_count = sum(combined_text.count(word) for word in negative_words)
    
    return {
        'subreddit_activity': dict(subreddit_counts.most_common(10)),
        'total_posts': len(posts),
        'total_comments': len(comments),
        'avg_post_length': sum(len(post['title'] + post['content']) for post in posts) / max(len(posts), 1),
        'avg_comment_length': sum(len(comment['body']) for comment in comments) / max(len(comments), 1),
        'sentiment_ratio': positive_count / max(positive_count + negative_count, 1),
        'most_active_subreddits': list(subreddit_counts.most_common(5))
    }

# Generate user persona
def generate_persona_with_citations(username: str, posts: List[dict], comments: List[dict]) -> str:
    if not posts and not comments:
        return f"No data found for user {username}. The account may be private or deleted."
    
    # Analyze patterns
    analysis = analyze_basic_patterns(posts, comments)
    
    # Build persona sections
    persona_sections = []
    
    # Header
    persona_sections.append(f"=== USER PERSONA FOR u/{username} ===")
    persona_sections.append(f"Generated on: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    persona_sections.append(f"Data analyzed: {analysis['total_posts']} posts, {analysis['total_comments']} comments")
    persona_sections.append("")
    
    # 1. Overview
    persona_sections.append("## OVERVIEW")
    persona_sections.append(f"u/{username} is an active Reddit user with {analysis['total_posts']} posts and {analysis['total_comments']} comments.")
    if analysis['most_active_subreddits']:
        top_subs = [sub[0] for sub in analysis['most_active_subreddits'][:3]]
        persona_sections.append(f"Most active in communities: {', '.join(top_subs)}")
    persona_sections.append("")
    
    # 2. Interests and Hobbies
    persona_sections.append("## INTERESTS AND HOBBIES")
    interests = extract_interests(posts, comments)
    for interest, evidence in interests.items():
        persona_sections.append(f"• {interest}")
        for cite in evidence[:2]:  # Limit citations
            persona_sections.append(f"  Citation: \"{cite['text'][:100]}...\" ({cite['source']})")
    persona_sections.append("")
    
    # 3. Writing Style
    persona_sections.append("## WRITING STYLE AND TONE")
    style_analysis = analyze_writing_style(posts, comments)
    persona_sections.append(f"• Average post length: {analysis['avg_post_length']:.0f} characters")
    persona_sections.append(f"• Average comment length: {analysis['avg_comment_length']:.0f} characters")
    persona_sections.append(f"• Sentiment tendency: {'Positive' if analysis['sentiment_ratio'] > 0.5 else 'Negative' if analysis['sentiment_ratio'] < 0.3 else 'Neutral'}")
    
    # Add style examples
    if style_analysis['examples']:
        persona_sections.append("• Writing examples:")
        for example in style_analysis['examples'][:3]:
            persona_sections.append(f"  \"{example['text'][:80]}...\" ({example['source']})")
    persona_sections.append("")
    
    # 4. Community Engagement
    persona_sections.append("## COMMUNITY ENGAGEMENT")
    persona_sections.append(f"• Most active subreddits: {dict(analysis['most_active_subreddits'])}")
    persona_sections.append(f"• Engagement level: {'High' if analysis['total_comments'] > 50 else 'Medium' if analysis['total_comments'] > 20 else 'Low'}")
    
    # Add subreddit-specific behavior
    subreddit_behavior = analyze_subreddit_behavior(posts, comments)
    for subreddit, behavior in list(subreddit_behavior.items())[:3]:
        persona_sections.append(f"• r/{subreddit}: {behavior['description']}")
        if behavior['examples']:
            persona_sections.append(f"  Example: \"{behavior['examples'][0][:80]}...\"")
    
    persona_sections.append("")
    
    # 5. Beliefs and Opinions
    persona_sections.append("## BELIEFS AND OPINIONS")
    opinions = extract_opinions(posts, comments)
    for opinion, evidence in opinions.items():
        persona_sections.append(f"• {opinion}")
        for cite in evidence[:2]:
            persona_sections.append(f"  Citation: \"{cite['text'][:100]}...\" ({cite['source']})")
    
    return "\n".join(persona_sections)

# Extract interests
def extract_interests(posts: List[dict], comments: List[dict]) -> Dict[str, List[Dict]]:
    interests = {}
    
    # Interest keywords mapping
    interest_keywords = {
        'Gaming': ['game', 'gaming', 'play', 'steam', 'console', 'pc', 'xbox', 'playstation'],
        'Technology': ['tech', 'software', 'programming', 'code', 'developer', 'computer'],
        'Sports': ['sport', 'team', 'match', 'player', 'season', 'game'],
        'Music': ['music', 'song', 'album', 'artist', 'band', 'concert'],
        'Movies/TV': ['movie', 'film', 'show', 'series', 'actor', 'director'],
        'Food': ['food', 'recipe', 'cooking', 'restaurant', 'eat', 'meal'],
        'Travel': ['travel', 'trip', 'vacation', 'country', 'city', 'visit'],
        'Fitness': ['gym', 'workout', 'exercise', 'fitness', 'weight', 'training']
    }
    
    # Check posts
    for post in posts:
        text = (post['title'] + ' ' + post['content']).lower()
        for interest, keywords in interest_keywords.items():
            if any(keyword in text for keyword in keywords):
                if interest not in interests:
                    interests[interest] = []
                interests[interest].append({
                    'text': post['title'],
                    'source': f"Post in r/{post['subreddit']}"
                })
    
    # Check comments
    for comment in comments:
        text = comment['body'].lower()
        for interest, keywords in interest_keywords.items():
            if any(keyword in text for keyword in keywords):
                if interest not in interests:
                    interests[interest] = []
                interests[interest].append({
                    'text': comment['body'],
                    'source': f"Comment in r/{comment['subreddit']}"
                })
    
    return interests

def analyze_writing_style(posts: List[dict], comments: List[dict]) -> Dict[str, Any]:
    examples = []
    
    # Get representative examples
    for post in posts[:5]:
        if post['title']:
            examples.append({
                'text': post['title'],
                'source': f"Post title in r/{post['subreddit']}"
            })
    
    for comment in comments[:5]:
        if len(comment['body']) > 50:
            examples.append({
                'text': comment['body'],
                'source': f"Comment in r/{comment['subreddit']}"
            })
    
    return {'examples': examples}

def analyze_subreddit_behavior(posts: List[dict], comments: List[dict]) -> Dict[str, Dict]:
    subreddit_data = {}
    
    # Aggregate activity by subreddit
    for post in posts:
        sub = post['subreddit']
        if sub not in subreddit_data:
            subreddit_data[sub] = {'posts': [], 'comments': []}
        subreddit_data[sub]['posts'].append(post)
    
    for comment in comments:
        sub = comment['subreddit']
        if sub not in subreddit_data:
            subreddit_data[sub] = {'posts': [], 'comments': []}
        subreddit_data[sub]['comments'].append(comment)
    
    # Analyze each subreddit
    behavior = {}
    for sub, data in subreddit_data.items():
        post_count = len(data['posts'])
        comment_count = len(data['comments'])
        
        if post_count > comment_count:
            behavior[sub] = {
                'description': f"Active poster ({post_count} posts, {comment_count} comments)",
                'examples': [p['title'] for p in data['posts'][:2]]
            }
        else:
            behavior[sub] = {
                'description': f"Active commenter ({comment_count} comments, {post_count} posts)",
                'examples': [c['body'] for c in data['comments'][:2]]
            }
    
    return behavior

def extract_opinions(posts: List[dict], comments: List[dict]) -> Dict[str, List[Dict]]:
    opinions = {}
    
    # Opinion indicators
    opinion_patterns = [
        r'i think',
        r'i believe',
        r'in my opinion',
        r'i feel',
        r'personally',
        r'i disagree',
        r'i agree'
    ]
    
    # Check posts
    for post in posts:
        text = (post['title'] + ' ' + post['content']).lower()
        for pattern in opinion_patterns:
            if re.search(pattern, text):
                key = f"Opinion from r/{post['subreddit']}"
                if key not in opinions:
                    opinions[key] = []
                opinions[key].append({
                    'text': post['title'],
                    'source': f"Post in r/{post['subreddit']}"
                })
    
    # Check comments
    for comment in comments:
        text = comment['body'].lower()
        for pattern in opinion_patterns:
            if re.search(pattern, text):
                key = f"Opinion from r/{comment['subreddit']}"
                if key not in opinions:
                    opinions[key] = []
                opinions[key].append({
                    'text': comment['body'],
                    'source': f"Comment in r/{comment['subreddit']}"
                })
    
    return opinions
    
    