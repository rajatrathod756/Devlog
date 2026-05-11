from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.feed_repository import get_feed_repo

async def get_feed_service(cursor: int | None , limit: int, current_user_id: int, db: AsyncSession):
    # Placeholder for actual feed retrieval logic
    # You can implement your feed retrieval logic here, such as querying the database for posts
  
    return await get_feed_repo(cursor=cursor, limit=limit, current_user_id=current_user_id, db=db)
    
    