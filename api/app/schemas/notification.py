from datetime import datetime

from pydantic import BaseModel

from app.schemas.user import (
    UserPreview
)


class NotificationResponse(
    BaseModel
):

    id: int

    type: str

    read: bool

    post_id: int | None

    comment_id: int | None

    created_at: datetime

    actor: UserPreview | None

    class Config:

        from_attributes = True