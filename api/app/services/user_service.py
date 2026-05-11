from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.user_repository import (
    get_current_user_posts_repo,
    get_user_profile_repo
)


async def get_user_profile_service(
    profile_user_id: int,
    current_user_id: int,
    db: AsyncSession
):

    return await get_user_profile_repo(
        profile_user_id=profile_user_id,
        current_user_id=current_user_id,
        db=db
    )


async def get_current_user_posts_service(
    user_id: int,
    db: AsyncSession
):

    return await get_current_user_posts_repo(
        user_id=user_id,
        db=db
    )