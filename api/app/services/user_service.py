from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import UploadFile

from app.repositories.user_repository import (
    get_current_user_posts_repo,
    get_user_profile_repo,
    update_user_repo
)

from app.utils.file_upload import upload_image


async def get_user_profile_service(
    profile_user_id: int,
    current_user_id: int,
    db: AsyncSession
):

    return await get_user_profile_repo(
        profile_user_id=profile_user_id,
        current_user_id=current_user_id,
        db=db
    )


async def get_current_user_posts_service(
    user_id: int,
    cursor: int | None,
    limit: int,
    db: AsyncSession
):

    return await get_current_user_posts_repo(
        user_id=user_id,
        cursor=cursor,
        limit=limit,
        db=db
    )

async def update_profile_service(

    user,

    db,

    username: str | None = None,

    name: str | None = None,

    bio: str | None = None,

    profile_image: UploadFile | None = None,
):

    profile_image_url = None


    if profile_image:

        profile_image_url = (
            await upload_image(
                profile_image,
                folder="profiles"
            )
        )


    updated_user = await update_user_repo(

        user=user,

        db=db,

        username=username,

        name=name,

        bio=bio,

        profile_image_url=
            profile_image_url,
    )

    return updated_user