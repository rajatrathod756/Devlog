from app.models.post import Post
from sqlalchemy.orm import Session

def create_post_repo(
    image_url : str,
    caption : str,
    db : Session
):
    post = Post(
        image_url=image_url,
        caption=caption,
    )
    
    db.add(post)
    db.commit()
    db.refresh(post)

    return post

def get_post_repo(post_id:int, db:Session):
    
    post = db.query(Post).filter(Post.id == post_id).first()
    
    
    return post