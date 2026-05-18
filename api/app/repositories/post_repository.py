from turtle import update
from fastapi import HTTPException
from sqlalchemy import select,func
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.post import Post
from app.models.like import Like
from app.models.comment import Comment

from app.repositories.notification_repository import create_notification_repo


async def create_post_repo(
    image_url: str,
    caption: str,
    user_id: int,
    db: AsyncSession
):

    post = Post(
        image_url=image_url,
        caption=caption,
        user_id=user_id
    )

    db.add(post)

    await db.commit()

    await db.refresh(post)

    return post


async def get_post_repo(

    post_id: int,

    db: AsyncSession
):

    query = (

        select(Post)

        .options(

            selectinload(Post.user),

            selectinload(Post.comments)
            .selectinload(Comment.user)
        )

        .where(Post.id == post_id)
    )

    result = await db.execute(query)

    return result.scalar_one_or_none()

async def get_posts_repo(
    user_id: int,
    db: AsyncSession
):
    query = (
        select(Post)
        .options(
            selectinload(Post.user),
        )
        .where(Post.user_id == user_id)
        .order_by(Post.created_at.desc())
    )

    result = await db.execute(query)
    return result.scalars().all()


async def like_post_repo(

    post_id: int,

    user_id: int,

    db: AsyncSession
):

    # CHECK IF ALREADY LIKED

    existing_like = await db.scalar(

        select(Like).where(

            Like.post_id == post_id,

            Like.user_id == user_id
        )
    )


    if existing_like:

        raise HTTPException(

            status_code=400,

            detail="Post already liked"
        )


    # GET POST

    post = await db.scalar(

        select(Post)

        .where(Post.id == post_id)
    )


    if not post:

        raise HTTPException(

            status_code=404,

            detail="Post not found"
        )


    # CREATE LIKE

    like = Like(

        post_id=post_id,

        user_id=user_id
    )

    db.add(like)

    await db.flush()


    # CREATE NOTIFICATION

    if post.user_id != user_id:

        await create_notification_repo(

            recipient_id=post.user_id,

            actor_id=user_id,

            type="like",

            post_id=post_id,

            comment_id=None,

            db=db
        )


    # GET UPDATED LIKES COUNT

    likes_count = await db.scalar(

        select(func.count())

        .select_from(Like)

        .where(
            Like.post_id == post_id
        )
    )


    await db.commit()


    return {
        "post_id": post_id,
        "user_id": user_id,
        "likes_count": likes_count
    }
    
async def unlike_post_repo(
    post_id: int,
    user_id: int,
    db: AsyncSession
):

    existing_like = await db.scalar(
        select(Like).where(
            Like.post_id == post_id,
            Like.user_id == user_id
        )
    )

    if not existing_like:
        raise HTTPException(
            status_code=400,
            detail="Post not liked"
        )

    await db.delete(existing_like)

    await db.flush()

    likes_count = await db.scalar(
        select(func.count())
        .select_from(Like)
        .where(Like.post_id == post_id)
    )

    await db.commit()

    return {
        "post_id": post_id,
        "user_id": user_id,
        "likes_count": likes_count
    }

async def create_comment_repo(

    post_id: int,

    user_id: int,

    content: str,

    db: AsyncSession
):

    comment = Comment(

        post_id=post_id,

        user_id=user_id,

        content=content
    )

    db.add(comment)

    await db.commit()

    await db.refresh(comment)

    return comment