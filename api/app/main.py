from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import app.models
from app.api.v1.api import router
from app.core.config import settings
from app.core.middleware import LoggingMiddleware


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION
)

# CORS

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Logging Middleware

app.add_middleware(LoggingMiddleware)

# Routes

app.include_router(
    router,
    prefix="/api/v1"
)