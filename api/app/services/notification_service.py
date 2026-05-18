from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from app.repositories.notification_repository import (

    get_user_notifications_repo,

    mark_notifications_read_repo
)


async def get_notifications_service(

    user_id: int,

    db: AsyncSession
):

    return await get_user_notifications_repo(

        user_id=user_id,

        db=db
    )


async def mark_notifications_read_service(

    user_id: int,

    db: AsyncSession
):

    await mark_notifications_read_repo(

        user_id=user_id,

        db=db
    )

    return {
        "message":
            "Notifications marked as read"
    }