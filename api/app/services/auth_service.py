from sqlalchemy.ext.asyncio import AsyncSession

from app.schemas.user import UserCreate

from app.repositories.auth_repository import (
    get_user_by_email,
    get_user_by_username,
    create_user
)

from app.core.security import (
    hash_password,
    verify_password,
    create_access_token
)

from app.core.exceptions import UnauthorizedException


async def signup_service(
    user_data: UserCreate,
    db: AsyncSession
):

    existing_email = await get_user_by_email(
        user_data.email,
        db
    )

    if existing_email:
        raise UnauthorizedException(
            detail="Email already exists"
        )

    existing_username = await get_user_by_username(
        user_data.username,
        db
    )

    if existing_username:
        raise UnauthorizedException(
            detail="Username already exists"
        )

    password_hash = hash_password(
        user_data.password
    )

    user = await create_user(
        username=user_data.username,
        email=user_data.email,
        password_hash=password_hash,
        db=db
    )

    return user


async def login_service(
    email: str,
    password: str,
    db: AsyncSession
):

    user = await get_user_by_email(
        email,
        db
    )

    if not user:
        raise UnauthorizedException(
            detail="Invalid credentials"
        )

    valid_password = verify_password(
        password,
        user.password_hash
    )

    if not valid_password:
        raise UnauthorizedException(
            detail="Invalid credentials"
        )

    access_token = create_access_token(
        data={
            "sub": str(user.id),
            "username" : user.username

        }
    )

    return {

        "access_token": access_token,

        "token_type": "bearer",

        "user": {

            "id": user.id,

            "username": user.username,

            "email": user.email,

            "profile_image_url":
                user.profile_image_url,

            "name": user.name,

            "bio"  : user.bio
        }
    }