from fastapi import APIRouter
from app.api.v1.routes import posts
from app.api.v1.routes import feed
from app.api.v1.routes import auth

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

router.include_router(
    auth.router,
    prefix="/auth",
    tags=["Authentication"]
)