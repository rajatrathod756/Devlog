from sqlalchemy.ext.asyncio import AsyncSession

from app.utils.file_upload import upload_image

from app.repositories.post_repository import (
    create_post_repo,
    get_post_repo
)


async def create_post_service(
    image,
    caption: str,
    user_id: int,
    db: AsyncSession
):

    image_url = await upload_image(image)

    post = await create_post_repo(
        image_url=image_url,
        caption=caption,
        user_id=user_id,
        db=db
    )

    return post


async def get_post_service(
    post_id: int,
    db: AsyncSession
):

    return await get_post_repo(
        post_id,
        db
    )
