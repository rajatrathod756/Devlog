from sqlalchemy import (
    select,
    func,
    or_
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
    cursor: int | None,
    limit: int,
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

    if cursor:
        query = query.where(
            Post.id < cursor
        )

    result = await db.execute(
        query.limit(limit + 1)
    )

    posts = result.scalars().all()

    has_more = len(posts) > limit

    if has_more:
        posts = posts[:limit]

    next_cursor = (
        posts[-1].id
        if has_more and posts
        else None
    )

    return {
        "posts": posts,
        "next_cursor": next_cursor,
        "has_more": has_more
    }


async def get_user_profile_repo(
    profile_user_name: str,
    current_user_name: str,
    current_user_id: int,
    db: AsyncSession
):

    # =========================
    # GET USER
    # =========================

    user_query = (
        select(User)
        .where(User.username == profile_user_name)
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
            Follow.following_id == user.id
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
            Follow.follower_id == user.id
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
            Post.user_id == user.id
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
            Follow.following_id == user.id
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
            Follow.follower_id == user.id,
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

async def update_user_repo(

    user: User,

    db: AsyncSession,

    username: str | None = None,

    name: str | None = None,

    bio: str | None = None,

    profile_image_url: str | None = None,
):

    if username is not None:
        user.username = username

    if name is not None:
        user.name = name

    if bio is not None:
        user.bio = bio

    if profile_image_url is not None:
        user.profile_image_url = (
            profile_image_url
        )

    await db.commit()

    await db.refresh(user)

    return user


async def search_users_repo(
    query: str,
    db: AsyncSession
):
    
    if len(query) < 2:
        print("Query too short for search", query)
        return {"users": []}
        
    result = await db.execute(
        select(User)
        .where(
            or_(
                User.username.ilike(f"{query}%"),
                User.name.ilike(f"{query}%")
            )
        )
        .limit(10)
    )

    users = result.scalars().all()

    return {"users": users}


async def follow_user_profile_repo(

    current_user_id: int,

    db: AsyncSession,

    target_user_id: int
):

    if current_user_id == target_user_id:
        return None

    existing_follow_query = (
        select(Follow)
        .where(
            Follow.follower_id == current_user_id,
            Follow.following_id == target_user_id
        )
    )

    existing_follow_result = await db.execute(
        existing_follow_query
    )

    existing_follow = existing_follow_result.scalar_one_or_none()

    if existing_follow:
        return None

    new_follow = Follow(
        follower_id=current_user_id,
        following_id=target_user_id
    )

    db.add(new_follow)
    await db.commit()

    return new_follow

async def unfollow_user_profile_repo(

    current_user_id: int,

    db: AsyncSession,

    target_user_id: int

):

    if current_user_id == target_user_id:
        return None

    existing_follow_query = (
        select(Follow)
        .where(
            Follow.follower_id == current_user_id,
            Follow.following_id == target_user_id
        )
    )

    existing_follow_result = await db.execute(
        existing_follow_query
    )

    existing_follow = existing_follow_result.scalar_one_or_none()

    if not existing_follow:
        return None

    await db.delete(existing_follow)
    await db.commit()

    return existing_follow