from pydantic import BaseModel
from datetime import datetime


class MinimalPost(BaseModel):
    id: int
    image_url: str
    caption: str | None
    created_at: datetime
    user_id: int
    username: str
    is_followed: bool = False
    is_liked: bool = False
    is_bookmarked: bool = False
    no_of_likes: int = 0

    class Config:
        from_attributes = True
        
class FeedPreview(BaseModel):

    Posts: list[MinimalPost] = []

