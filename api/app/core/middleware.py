import time

from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware


class LoggingMiddleware(BaseHTTPMiddleware):

    async def dispatch(self, request: Request, call_next):

        start_time = time.time()

        response = await call_next(request)

        process_time = time.time() - start_time

        print(
            f"{request.method} "
            f"{request.url.path} "
            f"completed_in={process_time:.4f}s "
            f"status_code={response.status_code}"
        )

        return response