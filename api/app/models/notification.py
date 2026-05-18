from datetime import datetime

from sqlalchemy import (

    Integer,
    String,
    Boolean,
    ForeignKey,
    DateTime
)

from sqlalchemy.orm import (
    Mapped,
    mapped_column,
    relationship
)

from app.db.base import Base


class Notification(Base):

    __tablename__ = "notifications"


    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    recipient_id: Mapped[int] = mapped_column(
        ForeignKey("users.id")
    )

    actor_id: Mapped[int | None] = mapped_column(
        ForeignKey("users.id"),
        nullable=True
    )

    type: Mapped[str] = mapped_column(
        String
    )

    post_id: Mapped[int | None] = mapped_column(
        ForeignKey("posts.id"),
        nullable=True
    )

    comment_id: Mapped[int | None] = mapped_column(
        ForeignKey("comments.id"),
        nullable=True
    )

    read: Mapped[bool] = mapped_column(
        Boolean,
        default=False
    )

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=datetime.utcnow
    )


    recipient = relationship(
        "User",
        foreign_keys=[recipient_id]
    )

    actor = relationship(
        "User",
        foreign_keys=[actor_id]
    )