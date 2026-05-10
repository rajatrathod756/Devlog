from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.feed_repository import get_feed_repo


async def get_feed_service(
    db: AsyncSession
):

    posts = await get_feed_repo(db=db)

    return posts