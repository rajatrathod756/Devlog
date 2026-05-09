
from sqlalchemy.orm import Session
from app.models.post import Post

def get_feed_repo(db: Session):
    posts = db.query(Post).order_by(Post.created_at.desc()).all()
    
    return posts