from sqlalchemy import Column, Integer, String, ForeignKey, TIMESTAMP
from app.core.database import Base

class Post(Base):
    __tablename__ = "Posts"

    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=False)
    caption = Column(String)
    created_at = Column(TIMESTAMP, nullable=False)