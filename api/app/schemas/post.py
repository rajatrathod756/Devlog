from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.schemas.user import UserPreview
from app.schemas.comment import CommentPreview


class PostResponse(BaseModel):

    id: int
    image_url: str
    caption: str | None

    user: UserPreview

    comments_count: int = 0

    comments: list[CommentPreview] = []

    created_at: datetime

    class Config:
        from_attributes = True
        
class PostsList(BaseModel):
    id: int
    image_url: str

    user: UserPreview

    created_at: datetime
    