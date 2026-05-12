from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.comment_repository import (
    create_comment_repo
)


async def create_comment_service(

    post_id: int,

    user_id: int,

    content: str,

    db: AsyncSession
):

    return await create_comment_repo(

        post_id=post_id,

        user_id=user_id,

        content=content,

        db=db
    )