from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.database import get_db
from app.services.feed_service import get_feed_service
from app.schemas.post import PostResponse
from app.api.dependencies.auth import get_current_user

router = APIRouter()


@router.get("")
async def get_feed(cursor: int | None = None,
    limit: int = 10,
    db: AsyncSession = Depends(get_db),
    current_user = Depends(get_current_user)
):

    return await get_feed_service(cursor=cursor, limit=limit, current_user_id=current_user.id, db=db)
