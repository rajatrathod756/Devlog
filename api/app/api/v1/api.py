from fastapi import APIRouter
from app.api.v1.routes import posts
from app.api.v1.routes import feed

router = APIRouter()

router.include_router(
    posts.router,
    prefix="/posts",
    tags=["Posts"]
)

router.include_router(
    feed.router,
    prefix="/feed",
    tags=["Feed"]
)