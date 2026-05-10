from fastapi import (
    APIRouter,
    Depends
)

from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.database import get_db

from app.schemas.user import (
    UserCreate,
    UserResponse
)

from app.api.dependencies.auth import get_current_user
from app.models.user import User

from app.services.auth_service import (
    signup_service,
    login_service
)

router = APIRouter()


@router.post(
    "/signup",
    response_model=UserResponse
)
async def signup(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
):

    return await signup_service(
        user_data,
        db
    )


@router.post("/login")
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: AsyncSession = Depends(get_db)
):

    return await login_service(
        email=form_data.username,
        password=form_data.password,
        db=db
    )


@router.get("/me")
async def get_me(
    current_user: User = Depends(get_current_user)
):

    return {
        "id": current_user.id,
        "username": current_user.username,
        "email": current_user.email
    }