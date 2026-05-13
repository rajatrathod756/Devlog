

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Index,
    func
)

from sqlalchemy.sql import func

from sqlalchemy.orm import relationship

from app.db.base import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    name = Column(
        String,
        nullable=True
    )

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password_hash = Column(
        String,
        nullable=False
    )

    bio = Column(
        String,
        nullable=True
    )

    profile_image_url = Column(
        String,
        nullable=True
    )

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    posts = relationship(
        "Post",
        back_populates="user",
        cascade="all, delete"
    )

    comments = relationship(
        "Comment",
        back_populates="user",
        cascade="all, delete"
    )

    liked_posts = relationship(
        "Like",
        back_populates="user",
        cascade="all, delete-orphan"
    )
    
    __table_args__ = (
        Index(
            "idx_users_username_lower",
            func.lower(username)
        ),
        Index(
            "idx_users_name_lower",
            func.lower(name)
        ),
    )

    
