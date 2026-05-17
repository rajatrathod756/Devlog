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

from app.schemas.post import PostResponse, PostsList

from app.schemas.comment import (
    CommentCreate,
    CommentPreview
)

from app.services.comment_service import (
    create_comment_service
)

from app.services.post_service import (
    create_post_service,
    get_post_service,
    like_post_service,
    unlike_post_service,
    get_posts_service
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

@router.get(
    "/for-user/{user_id}",
    response_model=list[PostsList]
)
async def get_posts(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):

    posts = await get_posts_service(
        user_id,
        db
    )

    if not posts:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Posts not found"
        )

    return posts

@router.post("/{post_id}/like")
async def like_post(
    post_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    post = await like_post_service(
        post_id,
        current_user.id,
        db
    )

    return {
        "message": "Post liked",
    }
    
@router.delete("/{post_id}/like")
async def unlike_post(
    post_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    post = await unlike_post_service(
        post_id,
        current_user.id,
        db
    )

    return {
        "message": "Post unliked",
    }


@router.post(
    "/{post_id}/comments",
    response_model=CommentPreview,
    status_code=status.HTTP_201_CREATED
)
async def create_comment(

    post_id: int,

    payload: CommentCreate,

    db: AsyncSession = Depends(get_db),

    current_user: User = Depends(get_current_user)
):

    comment = await create_comment_service(

        post_id=post_id,

        user_id=current_user.id,

        content=payload.content,

        db=db
    )

    return {

        "id": comment.id,

        "content": comment.content,

        "created_at": comment.created_at,

        "user": {

            "id": current_user.id,

            "username":
                current_user.username,

            "profile_image_url":
                current_user.profile_image_url,
        }
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