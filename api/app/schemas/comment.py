from pydantic import BaseModel
from datetime import datetime

from app.schemas.user import UserPreview


class CommentCreate(BaseModel):

    content: str


class CommentPreview(BaseModel):

    id: int
    content: str

    user: UserPreview

    created_at: datetime

    class Config:
        from_attributes = True
