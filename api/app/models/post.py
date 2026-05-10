from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP, DateTime
from sqlalchemy.sql import func
from app.db.base import Base

class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    #user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    caption = Column(String)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )