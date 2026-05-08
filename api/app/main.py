from fastapi import FastAPI
from app.api.v1.api import router

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "API Running"}

app.include_router(
    router,
    prefix="/api/v1"
)