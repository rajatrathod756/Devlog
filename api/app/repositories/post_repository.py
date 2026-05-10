from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post import Post


async def create_post_repo(
    image_url: str,
    caption: str,
    db: AsyncSession
):
    post = Post(
        image_url=image_url,
        caption=caption
    )

    db.add(post)

    await db.commit()
    await db.refresh(post)

    return post


async def get_post_repo(
    post_id: int,
    db: AsyncSession
):
    query = select(Post).where(Post.id == post_id)

    result = await db.execute(query)

    return result.scalar_one_or_none()