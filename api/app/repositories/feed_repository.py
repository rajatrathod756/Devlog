from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.post import Post
from app.models.like import Like


async def get_feed_repo(
    cursor: int | None,
    limit: int,
    current_user_id: int,
    db: AsyncSession
):
    is_liked_subquery = (
        select(Like.post_id)
        .where(
            Like.post_id == Post.id,
            Like.user_id == current_user_id
        )
        .exists()
    )

    query = (
        select(
            Post,
            is_liked_subquery.label("is_liked")
        )
        .order_by(Post.id.desc())
    )

    if cursor:
        query = query.where(Post.id < cursor)

    result = await db.execute(query.limit(limit + 1))

    rows = result.all()

    has_more = len(rows) > limit

    if has_more:
        rows = rows[:limit]

    posts = []

    for post, is_liked in rows:
        posts.append({
            "id": post.id,
            "image_url": post.image_url,
            "caption": post.caption,
            "user_id": post.user_id,
            "created_at": post.created_at,
            "is_liked": is_liked
        })

    next_cursor = posts[-1]["id"] if posts and has_more else None

    return {
        "posts": posts,
        "next_cursor": next_cursor,
        "has_more": has_more
    }