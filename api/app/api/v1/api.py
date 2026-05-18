from fastapi import APIRouter
from app.api.v1.routes import posts
from app.api.v1.routes import feed
from app.api.v1.routes import auth
from app.api.v1.routes import users
from app.api.v1.routes import notifications

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

router.include_router(
    users.router,
    prefix="/users",
    tags=["Users"]
)

router.include_router(
    notifications.router,
    prefix="/notifications",
    tags=["Notifications"]
)