from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.database import get_db
from app.services.feed_service import get_feed_service
from app.schemas.post import PostResponse

router = APIRouter()


@router.get("/", response_model=list[PostResponse])
async def get_feed(
    db: AsyncSession = Depends(get_db)
):

    posts = await get_feed_service(db=db)

    return posts