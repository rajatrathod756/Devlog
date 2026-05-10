from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    Form
)

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.database import get_db
from app.services.post_service import (
    create_post_service,
    get_post_service
)

router = APIRouter()


@router.post("/")
async def create_post(
    image: UploadFile = File(...),
    caption: str = Form(...),
    db: AsyncSession = Depends(get_db)
):

    return await create_post_service(
        image=image,
        caption=caption,
        db=db
    )


@router.get("/{post_id}")
async def get_post(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):

    post = await get_post_service(post_id, db)

    if not post:
        return {
            "message": "Post not found"
        }

    return {
        "image_url": post.image_url,
        "caption": post.caption
    }


@router.get("/")
async def test_db(
    db: AsyncSession = Depends(get_db)
):

    await db.execute(text("SELECT 1"))

    return {
        "message": "DB connected successfully"
    }