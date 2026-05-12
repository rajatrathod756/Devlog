from sqlalchemy import (
    select,
    func
)

from sqlalchemy.orm import (
    selectinload
)

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post import Post
from app.models.like import Like
from app.models.comment import Comment


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


    likes_count_subquery = (

        select(func.count())

        .where(Like.post_id == Post.id)

        .scalar_subquery()
    )


    comments_count_subquery = (

        select(func.count())

        .select_from(Comment)

        .where(Comment.post_id == Post.id)

        .scalar_subquery()
    )


    query = (

        select(

            Post,

            is_liked_subquery.label(
                "is_liked"
            ),

            likes_count_subquery.label(
                "likes_count"
            ),

            comments_count_subquery.label(
                "comments_count"
            )
        )

        .options(
            selectinload(Post.user)
        )

        .order_by(Post.id.desc())
    )


    if cursor:

        query = query.where(
            Post.id < cursor
        )


    result = await db.execute(
        query.limit(limit + 1)
    )

    rows = result.all()

    has_more = len(rows) > limit


    if has_more:

        rows = rows[:limit]


    posts = []


    for (
        post,
        is_liked,
        likes_count,
        comments_count
    ) in rows:

        posts.append({

            "id": post.id,

            "image_url": post.image_url,

            "caption": post.caption,

            "user_id": post.user_id,

            "created_at": post.created_at,

            "is_liked": is_liked,

            "likes_count": likes_count,

            "comments_count": comments_count,

            "user": {

                "id": post.user.id,

                "username":
                    post.user.username,

                "profile_image_url":
                    post.user.profile_image_url,
            }
        })


    next_cursor = (

        posts[-1]["id"]

        if posts and has_more

        else None
    )


    return {

        "posts": posts,

        "next_cursor": next_cursor,

        "has_more": has_more
    }