from fastapi import FastAPI

from app.api.v1.api import router
from app.core.config import settings


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)


@app.get("/")
async def root():
    return {"message": "API Running"}


app.include_router(
    router,
    prefix="/api/v1"
)