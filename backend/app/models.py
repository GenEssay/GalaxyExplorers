from datetime import datetime

from sqlalchemy import DateTime, func
from sqlmodel import Column, Field, Relationship, SQLModel


# Shared properties
# TODO replace email str with EmailStr when sqlmodel supports it
class UserBase(SQLModel):
    email: str = Field(unique=True, index=True)
    is_active: bool = True
    is_superuser: bool = False
    full_name: str | None = None
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
    )


# Properties to receive via API on creation
class UserCreate(UserBase):
    password: str

    child_name: str | None = None
    is_male: bool = True
    age: int = 0
    brief_introduction: str | None = None
    avatar_url: str | None = None
    updated_at: datetime | None = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime(), onupdate=func.now()),
    )


# TODO replace email str with EmailStr when sqlmodel supports it
class UserCreateOpen(SQLModel):
    email: str
    password: str
    full_name: str | None = None


# Properties to receive via API on update, all are optional
# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdate(UserBase):
    email: str | None = None  # type: ignore
    password: str | None = None
    updated_at: datetime | None = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime(), onupdate=func.now()),
    )


# TODO replace email str with EmailStr when sqlmodel supports it
class UserUpdateMe(SQLModel):
    full_name: str | None = None
    email: str | None = None


class UpdatePassword(SQLModel):
    current_password: str
    new_password: str


# Database model, database table inferred from class name
class User(UserBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    hashed_password: str
    items: list["Item"] = Relationship(back_populates="owner")
    updated_at: datetime | None = Field(
        default_factory=datetime.utcnow,
        sa_column=Column(DateTime(), onupdate=func.now()),
    )

    child_name: str | None = None
    is_male: bool = True
    age: int = 0
    brief_introduction: str | None = None
    avatar_url: str | None = None

    def alias_dict(self) -> dict:
        # fixme: by_alias is useless in SQLModel
        # ref 1: https://github.com/tiangolo/sqlmodel/issues/374
        # ref 2: https://github.com/tiangolo/sqlmodel/pull/632#issuecomment-1768464919
        result = self.dict(by_alias=True)
        result["createdAt"] = result.pop("created_at")
        result["name"] = result["full_name"] or result["email"]
        result["id"] = result["email"]
        print(1111, result)
        return result


# Properties to return via API, id is always required
class UserOut(UserBase):
    id: int

    child_name: str | None = None
    is_male: bool = True
    age: int = 0
    brief_introduction: str | None = None
    avatar_url: str | None = None


class UsersOut(SQLModel):
    data: list[UserOut]
    count: int


# Shared properties
class ItemBase(SQLModel):
    title: str
    description: str | None = None


# Properties to receive on item creation
class ItemCreate(ItemBase):
    title: str


# Properties to receive on item update
class ItemUpdate(ItemBase):
    title: str | None = None  # type: ignore


# Database model, database table inferred from class name
class Item(ItemBase, table=True):
    id: int | None = Field(default=None, primary_key=True)
    title: str
    owner_id: int | None = Field(default=None, foreign_key="user.id", nullable=False)
    owner: User | None = Relationship(back_populates="items")


# Properties to return via API, id is always required
class ItemOut(ItemBase):
    id: int
    owner_id: int


class ItemsOut(SQLModel):
    data: list[ItemOut]
    count: int


# Generic message
class Message(SQLModel):
    message: str


# JSON payload containing access token
class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"


# Contents of JWT token
class TokenPayload(SQLModel):
    sub: int | None = None


class NewPassword(SQLModel):
    token: str
    new_password: str
