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
    db: AsyncSession = Depends(get_db)
):

    post = await create_post_service(
        image=image,
        caption=caption,
        db=db
    )

    return post


@router.get(
    "/{post_id}",
    response_model=PostResponse
)
async def get_post(
    post_id: int,
    db: AsyncSession = Depends(get_db)
):

    post = await get_post_service(post_id, db)

    if not post:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Post not found"
        )

    return post


@router.get("/health/db")
async def test_db(
    db: AsyncSession = Depends(get_db)
):

    await db.execute(text("SELECT 1"))

    return {
        "message": "DB connected successfully"
    }