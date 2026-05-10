from jose import JWTError, jwt

from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies.database import get_db

from app.core.config import settings
from app.core.exceptions import UnauthorizedException

from app.models.user import User


oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="/api/v1/auth/login"
)


async def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: AsyncSession = Depends(get_db)
):

    credentials_exception = UnauthorizedException(
        detail="Could not validate credentials"
    )

    try:

        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        user_id = payload.get("sub")

        if user_id is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception

    query = select(User).where(User.id == int(user_id))

    result = await db.execute(query)

    user = result.scalar_one_or_none()

    if user is None:
        raise credentials_exception

    return user