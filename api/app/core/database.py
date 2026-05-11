from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession
)

from sqlalchemy.orm import declarative_base

from app.core.config import settings


engine = create_async_engine(

    settings.DATABASE_URL,

    echo=True,

    pool_pre_ping=True,

    pool_recycle=3600,
)

AsyncSessionLocal = async_sessionmaker(

    bind=engine,

    class_=AsyncSession,

    expire_on_commit=False
)

Base = declarative_base()