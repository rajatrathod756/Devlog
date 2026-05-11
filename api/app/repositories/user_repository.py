from sqlalchemy import select
from sqlalchemy.orm import selectinload

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post import Post


async def get_current_user_posts_repo(
    user_id: int,
    db: AsyncSession
):

    query = (
        select(Post)
        .options(
            selectinload(Post.user),
            selectinload(Post.comments)
        )
        .where(Post.user_id == user_id)
        .order_by(Post.id.desc())
    )

    result = await db.execute(query)

    posts = result.scalars().all()

    return posts