from fastapi import FastAPI
from app.api.v1.api import router
from app.core.database import Base, engine
from app.models.post import Post

Base.metadata.create_all(bind=engine)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "API Running"}

app.include_router(
    router,
    prefix="/api/v1"
)