from sqlalchemy.orm import Session
from fastapi import UploadFile

from app.utils.file_upload import upload_image
from app.repositories.post_repository import create_post_repo
from app.repositories.post_repository import get_post_repo



async def create_post_service(
    image: UploadFile,
    caption: str,
    db: Session
):
    image_url = await upload_image(image)
    
    post = create_post_repo(
        image_url=image_url,
        caption=caption,
        db=db
    )
    
    return post

async def get_post_service(post_id:int,db:Session):
    
    post = get_post_repo(post_id,db)
    
    return post
