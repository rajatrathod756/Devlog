from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.database import get_db
from app.api.dependencies.auth import get_current_user

from app.models.user import User

from app.services.user_service import (
    get_current_user_posts_service
)

router = APIRouter()


@router.get("/me/posts")
async def get_my_posts(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return await get_current_user_posts_service(
        user_id=current_user.id,
        db=db
    )