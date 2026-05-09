from fastapi import APIRouter, UploadFile, File, Depends, Form
from sqlalchemy.orm import Session

from app.utils.file_upload import upload_image
from app.core.dependencies import get_db
from app.services.post_service import create_post_service
from app.services.post_service import get_post_service
from app.schemas.post import PostResponse

from sqlalchemy import text


router = APIRouter()


@router.post("/")
async def create_post(
    image: UploadFile = File(...),
    caption: str = Form(...),
    db: Session = Depends(get_db)
):

    return await create_post_service(
        image = image,
        caption = caption,
        db = db
    )

@router.get("/{post_id}", response_model=PostResponse)
async def get_post(post_id:int,db : Session = Depends(get_db)):
    
    post = await get_post_service(post_id,db)
    
    if not post:
        return {
            "message" : "Post not found"
        }
    
    return post
    
@router.get("/")
def test_db(db: Session = Depends(get_db)):

    result = db.execute(text("SELECT 1"))

    return {
        "message": "DB connected successfully"
    }