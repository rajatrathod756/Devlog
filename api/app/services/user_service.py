from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.user_repository import (
    get_current_user_posts_repo
)


async def get_current_user_posts_service(
    user_id: int,
    db: AsyncSession
):

    return await get_current_user_posts_repo(
        user_id=user_id,
        db=db
    )