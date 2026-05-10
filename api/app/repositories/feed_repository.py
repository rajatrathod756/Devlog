from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post import Post


async def get_feed_repo(
    db: AsyncSession
):

    query = (
        select(Post)
        .order_by(Post.created_at.desc())
    )

    result = await db.execute(query)

    posts = result.scalars().all()

    return posts