from sqlalchemy.ext.asyncio import AsyncSession

from fastapi import UploadFile

from app.repositories.user_repository import (
    get_current_user_posts_repo,
    get_user_profile_repo,
    update_user_repo,
    search_users_repo,
    follow_user_profile_repo,
    unfollow_user_profile_repo
)

from app.utils.file_upload import upload_image


async def get_user_profile_service(
    profile_user_name: str,
    current_user_id: int,
    current_user_name: str,
    db: AsyncSession
):

    return await get_user_profile_repo(
        profile_user_name=profile_user_name,
        current_user_id=current_user_id,
        current_user_name=current_user_name,
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

async def search_users_service(
    query: str,
    db: AsyncSession
):
    return await search_users_repo(
        query=query,
        db=db
    )
    
async def follow_user_profile_service(

    current_user_id: int,

    target_user_id: int,

    db: AsyncSession
):

    return await follow_user_profile_repo(

        current_user_id=current_user_id,

        target_user_id=target_user_id,

        db=db
    )
    
async def unfollow_user_profile_service(

    current_user_id: int,

    target_user_id: int,

    db: AsyncSession
):

    return await unfollow_user_profile_repo(

        current_user_id=current_user_id,

        target_user_id=target_user_id,

        db=db
    )
