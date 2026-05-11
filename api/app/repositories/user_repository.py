from sqlalchemy import (
    select,
    func
)

from sqlalchemy.orm import (
    selectinload
)

from sqlalchemy.ext.asyncio import (
    AsyncSession
)

from app.models.user import User
from app.models.post import Post
from app.models.follow import Follow


async def get_current_user_posts_repo(
    user_id: int,
    db: AsyncSession
):

    query = (
        select(Post)
        .options(
            selectinload(Post.user),
            selectinload(Post.comments)
        )
        .where(Post.user_id == user_id)
        .order_by(Post.id.desc())
    )

    result = await db.execute(query)

    posts = result.scalars().all()

    return posts


async def get_user_profile_repo(
    profile_user_id: int,
    current_user_id: int,
    db: AsyncSession
):

    # =========================
    # GET USER
    # =========================

    user_query = (
        select(User)
        .where(User.id == profile_user_id)
    )

    user_result = await db.execute(
        user_query
    )

    user = user_result.scalar_one_or_none()

    if not user:
        return None

    # =========================
    # FOLLOWERS COUNT
    # =========================

    followers_query = (
        select(func.count())
        .select_from(Follow)
        .where(
            Follow.following_id == profile_user_id
        )
    )

    followers_count = (
        await db.scalar(followers_query)
    ) or 0

    # =========================
    # FOLLOWING COUNT
    # =========================

    following_query = (
        select(func.count())
        .select_from(Follow)
        .where(
            Follow.follower_id == profile_user_id
        )
    )

    following_count = (
        await db.scalar(following_query)
    ) or 0

    # =========================
    # POSTS COUNT
    # =========================

    posts_query = (
        select(func.count())
        .select_from(Post)
        .where(
            Post.user_id == profile_user_id
        )
    )

    posts_count = (
        await db.scalar(posts_query)
    ) or 0

    # =========================
    # CURRENT USER FOLLOWS THEM?
    # =========================

    is_following_query = (
        select(Follow)
        .where(
            Follow.follower_id == current_user_id,
            Follow.following_id == profile_user_id
        )
    )

    is_following_result = await db.execute(
        is_following_query
    )

    is_following = (
        is_following_result.scalar_one_or_none()
        is not None
    )

    # =========================
    # THEY FOLLOW CURRENT USER?
    # =========================

    follows_you_query = (
        select(Follow)
        .where(
            Follow.follower_id == profile_user_id,
            Follow.following_id == current_user_id
        )
    )

    follows_you_result = await db.execute(
        follows_you_query
    )

    follows_you = (
        follows_you_result.scalar_one_or_none()
        is not None
    )

    # =========================
    # RETURN PROFILE RESPONSE
    # =========================

    return {
        "id": user.id,
        "name": user.name,
        "username": user.username,
        "bio": user.bio,
        "profile_image_url": user.profile_image_url,

        "followers_count": followers_count,
        "following_count": following_count,
        "posts_count": posts_count,

        "is_following": is_following,
        "follows_you": follows_you
    }