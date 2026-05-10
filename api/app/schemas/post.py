from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PostResponse(BaseModel):

    id: int
    image_url: str
    caption: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True