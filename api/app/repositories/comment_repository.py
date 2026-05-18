from sqlalchemy.ext.asyncio import AsyncSession

from app.models.comment import Comment

from app.repositories.notification_repository import create_notification_repo


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

    await db.flush()


    # GET POST OWNER

    post = await db.scalar(

        select(Post)

        .where(Post.id == post_id)
    )


    # CREATE NOTIFICATION

    if post and post.user_id != user_id:

        await create_notification_repo(

            recipient_id=post.user_id,

            actor_id=user_id,

            type="comment",

            post_id=post_id,

            comment_id=comment.id,

            db=db
        )


    await db.commit()

    await db.refresh(comment)

    return comment