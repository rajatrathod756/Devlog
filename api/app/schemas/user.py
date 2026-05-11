from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserPreview(BaseModel):

    id: int
    username: str
    profile_image_url: str | None

    class Config:
        from_attributes = True


class UserCreate(BaseModel):

    username: str
    email: EmailStr
    password: str


class UserResponse(BaseModel):

    id: int
    username: str
    email: EmailStr
    profile_image_url: str | None
    created_at: datetime

    class Config:
        from_attributes = True