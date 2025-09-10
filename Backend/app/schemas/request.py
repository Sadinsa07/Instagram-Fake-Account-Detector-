from pydantic import BaseModel

class UsernameInput(BaseModel):
    username: str

class AccountFeaturesInput(BaseModel):
    userFollowerCount: int
    userFollowingCount: int
    userMediaCount: int
    usernameDigitCount: int
    usernameLength: int
