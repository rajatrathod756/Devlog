from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.post import Post

async def get_feed_repo(
    cursor: int | None,
    limit: int,
    db: AsyncSession
):
    query = select(Post).order_by(Post.id.desc())

    if cursor:
        query = query.where(Post.id < cursor)

    result = await db.execute(query.limit(limit + 1))
    posts = result.scalars().all()

    has_more = len(posts) > limit

    if has_more:
        posts = posts[:limit]

    next_cursor = posts[-1].id if posts and has_more else None

    return {
        "posts": posts,
        "next_cursor": next_cursor,
        "has_more": has_more
    }