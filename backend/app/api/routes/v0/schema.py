from datetime import datetime
from enum import Enum
from typing import Any, Optional

from pydantic import BaseModel, EmailStr, Field


class ResponseMsg(str, Enum):
    SUCCESS = "success"
    UNAUTHORIZED = "unauthorized"
    SERVER_ERROR = "server error"
    INPUT_ERROR = "input error"
    WRONG_PASSWORD = "密码错误"
    VALIDATION_ERROR = "parameter validation error"
    TOKEN_EXPIRATION = "token expiration"
    TOKEN_INVALID = "token invalid"
    EMPTY_FILE_ERROR = "empty file error"
    API_ABANDONED_ERROR = "api abandoned error"
    THIRD_PART_SERVICE_ERROR = "third-part service error"
    MISSING_PARAMETER_ERROR = "missing parameter"
    USER_NOT_FOUND = "user not found"
    USER_ALREADY_EXIST = "user already exist"


class ResponseCode(int, Enum):
    SUCCESS = 200
    UNAUTHORIZED = 401
    SERVER_ERROR = 500
    INPUT_ERROR = 512
    WRONG_PASSWORD = 513
    VALIDATION_ERROR = 514
    TOKEN_EXPIRATION = 515
    EMPTY_FILE_ERROR = 516
    MISSING_PARAMETER_ERROR = 517
    API_ABANDONED_ERROR = 518
    THIRD_PART_SERVICE_ERROR = 519
    TOKEN_INVALID = 520
    USER_NOT_FOUND = 521
    USER_ALREADY_EXIST = 522


class ExceptionResponse(BaseModel):
    name: Optional[str] = Field(
        default=None, description="The name of the exception returned by the API."
    )
    trace: Optional[str] = Field(
        default=None,
        description="The detail trace of the exception returned by the API.",
    )
    message: str = Field(
        default=ResponseMsg.SERVER_ERROR, description="The message returned by the API."
    )


class HTTPResponse(BaseModel):
    data: Any = Field(None, description="The data returned by the API.")
    code: int = Field(
        default=ResponseCode.SUCCESS.value,
        description="The status code returned by the API.",
    )
    message: str = Field(
        default=ResponseMsg.SUCCESS, description="The message returned by the API."
    )


class ProcessRequest(BaseModel):
    prompt: str = Field(..., description="The prompt to use for the image generation.")
    seed: int = Field(..., description="The seed for the image generation.")
    image: str = Field(..., description="The URL of the image to process.")


class LoginRequest(BaseModel):
    secret: str = Field(
        ..., description="The secret of the user. Base64('username:password')"
    )


class RegisterRequest(BaseModel):
    username: str = Field(..., description="The username of the user.")
    email: str = Field(..., description="The email of the user.")
    password: str = Field(..., description="The password of the user.")
    invite_code: str = Field(
        ..., alias="inviteCode", description="The invite code of the user."
    )
    child_name: str = Field(..., description="The name of the child.")
    is_male: bool = Field(..., description="If the child is male")
    age: int = Field(..., description="The age of the child.")
    brief_introduction: str = Field(
        ..., description="A brief introduction of the child."
    )
    avatar_url: str = Field(..., description="The URL of the avatar of the child.")


class UserResponse(BaseModel):
    id: str = Field(..., description="User id")
    name: str = Field(..., description="The username of the user.")
    email: Optional[EmailStr] = Field(..., description="The email of the user.")
    created_at: Optional[datetime] = Field(
        ..., description="The created time.", alias="createdAt"
    )
    full_name: Optional[str] = Field(..., description="The full name of the user.")
    updated_at: Optional[datetime] = Field(..., description="The updated time.")
    child_name: Optional[str] = Field(..., description="The name of the child.")
    is_male: Optional[bool] = Field(..., description="If the child is male")
    age: Optional[int] = Field(..., description="The age of the child.")
    brief_introduction: Optional[str] = Field(
        ..., description="A brief introduction of the child."
    )
    avatar_url: Optional[str] = Field(
        ..., description="The URL of the avatar of the child."
    )

    class Config:
        from_attributes = True


class LoginResponse(BaseModel):
    token: str = Field(..., description="The token of the user.")
    expire_at: datetime = Field(
        ..., description="The expire time of the token.", alias="expireAt"
    )
    user: UserResponse = Field(..., description="The user info.")

    class Config:
        from_attributes = True
