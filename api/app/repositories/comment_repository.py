from sqlalchemy.ext.asyncio import AsyncSession

from app.models.comment import Comment


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