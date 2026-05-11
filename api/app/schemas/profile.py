from pydantic import BaseModel


class ProfileResponse(BaseModel):

    id: int

    name: str | None

    username: str

    bio: str | None

    profile_image_url: str | None

    followers_count: int

    following_count: int

    posts_count: int

    is_following: bool

    follows_you: bool