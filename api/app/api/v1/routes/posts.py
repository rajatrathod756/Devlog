from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session

from app.utils.file_upload import upload_image
from app.core.dependencies import get_db
from sqlalchemy import text


router = APIRouter()


@router.post("/")
async def create_post(
    image: UploadFile = File(...),
    caption: str = "",
    db: Session = Depends(get_db)
):

    image_url = await upload_image(image)

    

    return {
        "image_url": image_url,
        "caption": caption
    }
    
    
@router.get("/")
def test_db(db: Session = Depends(get_db)):

    result = db.execute(text("SELECT 1"))

    return {
        "message": "DB connected successfully"
    }