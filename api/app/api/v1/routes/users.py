from app.schemas.user import UserSearchResponse
from fastapi import APIRouter, Depends

from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import (
    UploadFile,
    File,
    Form
)

from app.api.dependencies.database import get_db
from app.api.dependencies.auth import get_current_user

from app.models.user import User

from app.schemas.profile import (
    ProfileResponse
)

from app.services.user_service import (
    get_current_user_posts_service,
    get_user_profile_service,
    update_profile_service,
    search_users_service
)

router = APIRouter()


@router.get("/me/posts")
async def get_my_posts(
    cursor: int | None = None,
    limit: int = 9,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    return await get_current_user_posts_service(
        user_id=current_user.id,
        cursor=cursor,
        limit=limit,
        db=db
    )


@router.get(
    "/{user_id}",
    response_model=ProfileResponse
)
async def get_user_profile(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    profile = await get_user_profile_service(
        profile_user_id=user_id,
        current_user_id=current_user.id,
        db=db
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return profile

@router.patch("/me")
async def update_profile(

    username: str | None = Form(None),

    name: str | None = Form(None),

    bio: str | None = Form(None),

    profile_image:
        UploadFile | None = File(None),

    db: AsyncSession = Depends(get_db),

    current_user: User =
        Depends(get_current_user)
):

    updated_user = (
        await update_profile_service(

            user=current_user,

            db=db,

            username=username,

            name=name,

            bio=bio,

            profile_image=profile_image,
        )
    )

    return {

        "id": updated_user.id,

        "username":
            updated_user.username,

        "name":
            updated_user.name,

        "bio":
            updated_user.bio,

        "email":
            updated_user.email,

        "profile_image_url":
            updated_user.profile_image_url,
    }


@router.get("/search/{query}", response_model=UserSearchResponse)
async def search_users(
    query: str,
    db: AsyncSession = Depends(get_db),
   
):

    updatedUser = await search_users_service(
            query=query,
            db=db
        );

    if not updatedUser:
        raise HTTPException(
            status_code=404,
            detail="No users found"
        )
    return updatedUser;
