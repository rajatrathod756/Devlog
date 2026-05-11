from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    Form,
    HTTPException,
    status
)

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.database import get_db
from app.api.dependencies.auth import get_current_user

from app.models.user import User

from app.schemas.post import PostResponse

from app.services.post_service import (
    create_post_service,
    get_post_service
)

router = APIRouter()


@router.post(
    "/",
    response_model=PostResponse,
    status_code=status.HTTP_201_CREATED
)
async def create_post(
    image: UploadFile = File(...),
    caption: str = Form(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    post = await create_post_service(
        image=image,
        caption=caption,
        user_id=current_user.id,
        db=db
    )

    return {
        "id": post.id,
        "image_url": post.image_url,
        "caption": post.caption,
        "user": {
            "id": current_user.id,
            "username": current_user.username,
            "profile_image_url": current_user.profile_image_url,
        },
        "comments_count": 0,
        "comments": [],
        "created_at": post.created_at,
    }


@router.get(
    "/{post_id}",
    response_model=PostResponse
)
async def get_post(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):

    post = await get_post_service(
        post_id,
        db
    )

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    return {
        "id": post.id,
        "image_url": post.image_url,
        "caption": post.caption,
        "user": post.user,
        "comments_count": len(post.comments),
        "comments": post.comments[:2],
        "created_at": post.created_at,
    }



# @router.delete("/dev/clear-posts")
# async def clear_posts(
#     db: AsyncSession = Depends(get_db)
# ):

#     await db.execute(
#         text("DELETE FROM posts")
#     )

#     await db.commit()

#     return {
#         "message": "Posts deleted"
#     }