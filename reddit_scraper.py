import praw

reddit = praw.Reddit(
    client_id="GVMU1XSuPKntCH4RdnxmkA",
    client_secret="APPJcoLu7XN026K5Nc3jZoqmp8u7Gw",
    user_agent="scarpper"
)

def get_user_data(username):
    user = reddit.redditor(username)
    posts = [post.title + "\n" + post.selftext for post in user.submissions.new(limit=50)]
    comments = [comment.body for comment in user.comments.new(limit=100)]
    return posts, comments
