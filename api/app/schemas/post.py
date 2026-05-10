from pydantic import BaseModel
from typing import Optional

class PostResponse(BaseModel):
    id : int
    image_url : str
    caption : Optional[str] = None

    class Config:
        from_attributes = True