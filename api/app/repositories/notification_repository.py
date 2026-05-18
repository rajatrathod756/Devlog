from sqlalchemy import (
    select,
    update
)

from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from sqlalchemy.orm import (
    selectinload
)

from app.models.notification import (
    Notification
)


async def create_notification_repo(

    recipient_id: int,

    actor_id: int | None,

    type: str,

    post_id: int | None,

    comment_id: int | None,

    db: AsyncSession
):

    notification = Notification(

        recipient_id=recipient_id,

        actor_id=actor_id,

        type=type,

        post_id=post_id,

        comment_id=comment_id
    )

    db.add(notification)

    await db.flush()

    return notification


async def get_user_notifications_repo(

    user_id: int,

    db: AsyncSession,

    limit: int = 50
):

    query = (

        select(Notification)

        .options(

            selectinload(
                Notification.actor
            )
        )

        .where(
            Notification.recipient_id == user_id
        )

        .order_by(
            Notification.created_at.desc()
        )

        .limit(limit)
    )

    result = await db.execute(query)

    return result.scalars().all()


async def mark_notifications_read_repo(

    user_id: int,

    db: AsyncSession
):

    await db.execute(

        update(Notification)

        .where(
            Notification.recipient_id == user_id
        )

        .values(read=True)
    )

    await db.commit()