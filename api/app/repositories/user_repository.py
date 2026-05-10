from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User


async def get_user_by_email(
    email: str,
    db: AsyncSession
):

    query = select(User).where(User.email == email)

    result = await db.execute(query)

    return result.scalar_one_or_none()


async def get_user_by_username(
    username: str,
    db: AsyncSession
):

    query = select(User).where(User.username == username)

    result = await db.execute(query)

    return result.scalar_one_or_none()


async def create_user(
    username: str,
    email: str,
    password_hash: str,
    db: AsyncSession
):

    user = User(
        username=username,
        email=email,
        password_hash=password_hash
    )

    db.add(user)

    await db.commit()

    await db.refresh(user)

    return user