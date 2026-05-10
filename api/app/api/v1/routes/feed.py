from fastapi import APIRouter, UploadFile, File, Depends, Form
from sqlalchemy.orm import Session
from app.core.dependencies import get_db
from sqlalchemy import text
from app.services.feed_service import get_feed_service
from app.schemas.post import PostResponse

router = APIRouter()

@router.get("/", response_model=list[PostResponse])
async def get_feed(db: Session = Depends(get_db)):
    
  
    
    posts = await get_feed_service(db = db)


    return posts