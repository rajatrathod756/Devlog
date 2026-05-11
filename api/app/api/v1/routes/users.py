from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.database import get_db
from app.api.dependencies.auth import get_current_user

from app.models.user import User

from app.schemas.profile import (
    ProfileResponse
)

from app.services.user_service import (
    get_current_user_posts_service,
    get_user_profile_service
)

router = APIRouter()


@router.get("/me/posts")
async def get_my_posts(
    cursor: int | None = None,
    limit: int = 9,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return await get_current_user_posts_service(
        user_id=current_user.id,
        cursor=cursor,
        limit=limit,
        db=db
    )


@router.get(
    "/{user_id}",
    response_model=ProfileResponse
)
async def get_user_profile(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    profile = await get_user_profile_service(
        profile_user_id=user_id,
        current_user_id=current_user.id,
        db=db
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return profile