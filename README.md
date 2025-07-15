# Reddit User Persona Generator

An AI-powered tool that scrapes Reddit user profiles and generates comprehensive user personas with citations from their posts and comments.

## Features

- **Reddit Profile Scraping**: Extracts posts and comments from any public Reddit user
- **User Persona Generation**: Creates detailed personas including interests, writing style, beliefs, and community engagement
- **Citation Support**: Each persona characteristic includes specific citations from the user's posts/comments
- **Comprehensive Analysis**: Analyzes posting patterns, subreddit activity, sentiment, and writing style
- **Export to Text**: Saves generated personas as formatted text files

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd reddit-persona-generator
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Set Up Reddit API Credentials

1. Go to [Reddit Apps](https://www.reddit.com/prefs/apps)
2. Click "Create App" or "Create Another App"
3. Fill in the details:
   - **Name**: Your app name
   - **App type**: Script
   - **Description**: Optional
   - **About URL**: Optional
   - **Redirect URI**: http://localhost:8080
4. Note down your `client_id` (under the app name) and `client_secret`

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Reddit API credentials:
   ```
   REDDIT_CLIENT_ID=your_client_id_here
   REDDIT_CLIENT_SECRET=your_client_secret_here
   REDDIT_USER_AGENT=PersonaGenerator/1.0
   ```

## Usage

### Basic Usage

```bash
python main.py <RedditProfileURL>
```

### Examples

```bash
# Generate persona for user 'kojied'
python main.py https://www.reddit.com/user/kojied/

# Generate persona for user 'Hungry-Move-6603'
python main.py https://www.reddit.com/user/Hungry-Move-6603/
```

### Output

The script will:
1. Extract the username from the provided URL
2. Scrape the user's posts and comments
3. Generate a comprehensive persona with citations
4. Save the result to `output/{username}_persona.txt`


## Project Structure

```
reddit-persona-generator/
├── main.py                 # Main script entry point
├── reddit_scraper.py       # Reddit API scraping functionality
├── persona_builder.py      # Persona generation and analysis
├── requirements.txt        # Python dependencies
├── .env.example           # Environment variables template
├── .gitignore             # Git ignore file
├── README.md              # This file
└── output/                # Generated persona files (created automatically)
    ├── kojied_persona.txt
    └── Hungry-Move-6603_persona.txt
```

## Technical Implementation

### Reddit Scraping (`reddit_scraper.py`)
- Uses the PRAW (Python Reddit API Wrapper) library
- Extracts up to 50 recent posts and 100 recent comments
- Handles authentication and error cases
- Collects metadata (timestamps, subreddits, scores)

### Persona Generation (`persona_builder.py`)
- Analyzes posting patterns and subreddit activity
- Extracts interests based on content keywords
- Performs basic sentiment analysis
- Generates citations for each persona characteristic
- Creates structured, readable output

### Main Script (`main.py`)
- Handles command-line arguments
- Orchestrates the scraping and generation process
- Provides user feedback and error handling
- Saves output to organized text files


## Dependencies

- `praw`: Reddit API wrapper
- `python-dotenv`: Environment variable management
- `requests`: HTTP requests handling
- `openai`: Optional integration with OpenAI API

