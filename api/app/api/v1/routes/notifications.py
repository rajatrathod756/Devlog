from fastapi import (

    APIRouter,

    Depends
)

from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from app.api.dependencies.database import (
    get_db
)

from app.api.dependencies.auth import (
    get_current_user
)

from app.models.user import User

from app.services.notification_service import (

    get_notifications_service,

    mark_notifications_read_service
)

from app.schemas.notification import (
    NotificationResponse
)


router = APIRouter()


@router.get(

    "/",

    response_model=list[
        NotificationResponse
    ]
)
async def get_notifications(

    db: AsyncSession =
        Depends(get_db),

    current_user: User =
        Depends(get_current_user)
):

    return await get_notifications_service(

        user_id=current_user.id,

        db=db
    )


@router.patch("/read")
async def mark_notifications_read(

    db: AsyncSession =
        Depends(get_db),

    current_user: User =
        Depends(get_current_user)
):

    return await mark_notifications_read_service(

        user_id=current_user.id,

        db=db
    )