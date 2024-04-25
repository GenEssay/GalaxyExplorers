import base64
from datetime import datetime, timedelta
from typing import Tuple

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

from app import crud, models
from app.api.deps import SessionDep
from app.api.routes.v0.schema import (
    ExceptionResponse,
    HTTPResponse,
    LoginRequest,
    LoginResponse,
    ProcessRequest,
    RegisterRequest,
    ResponseCode,
    UserResponse,
)
from app.core import security
from app.core.config import app_config
from app.services import img_gen_service
from app.services.email_service import (
    generate_new_account_email,
    send_email,
)
from app.utils.logger import logger

router = APIRouter()


def generate_token(user_id: int) -> Tuple[str, datetime]:
    """Generate token by user id.

    Args:
        user_id: User id.

    Returns:
        Tuple[str, datetime]: (token, expire time)
    """
    access_token_expires = timedelta(minutes=app_config.ACCESS_TOKEN_EXPIRE_MINUTES)
    expire = datetime.utcnow() + access_token_expires
    token = security.create_access_token(
        subject=str(user_id), expires_delta=access_token_expires
    )
    return token, expire


@router.get("/")
async def hello() -> str:
    logger.info("Hello request")
    return "Hello, World!"


@router.get("/download/{filename}", tags=["lcm"])
async def download_file(filename: str):
    directory = "image"
    return FileResponse(path=f"{directory}/{filename}", filename=filename)


@router.post("/process", tags=["lcm"])
async def req_process(request_data: ProcessRequest):
    result = img_gen_service.fal.generate(
        prompt=request_data.prompt, image=request_data.image, seed=request_data.seed
    )
    return HTTPResponse(data={"url": result})


@router.post(
    path="/user/login",
    tags=["users"],
    responses={
        ResponseCode.USER_NOT_FOUND.value: {
            "model": ExceptionResponse,
            "description": "User not found",
        },
        ResponseCode.WRONG_PASSWORD.value: {
            "model": ExceptionResponse,
            "description": "Wrong password",
        },
    },
    response_model=LoginResponse,
)
async def login(request_data: LoginRequest, db: SessionDep) -> LoginResponse:
    """The secret is Base64 encoded username:password."""
    # Decode the Base64 encoded username:password
    try:
        decoded_bytes = base64.b64decode(request_data.secret)
        decoded_str = decoded_bytes.decode("utf-8")
        username, password = decoded_str.split(":", 1)
    except (ValueError, UnicodeDecodeError):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid secret format."
        )

    # Authenticate the user
    user: models.User | None = crud.authenticate(
        session=db, email=username, password=password
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    elif not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )

    # Create access token
    access_token_expires = timedelta(minutes=app_config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = security.create_access_token(
        subject=user.id, expires_delta=access_token_expires
    )

    # Create response
    user_response = UserResponse(**user.alias_dict())
    print(2222, user_response)
    return LoginResponse(
        token=access_token,
        expireAt=datetime.utcnow() + access_token_expires,
        user=user_response,
    )


@router.post(
    "/user/register",
    tags=["users"],
    responses={
        ResponseCode.USER_ALREADY_EXIST.value: {
            "model": ExceptionResponse,
            "description": "User already exist",
        },
    },
    response_model=LoginResponse,
)
async def register(*, session: SessionDep, user_in: RegisterRequest) -> LoginResponse:
    """Invite code is 2048."""
    user = crud.get_user_by_email(session=session, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    user = crud.create_user(session=session, user_create=user_in)
    if app_config.emails_enabled and user_in.email:
        email_data = generate_new_account_email(
            email_to=user_in.email, username=user_in.email, password=user_in.password
        )
        send_email(
            email_to=user_in.email,
            subject=email_data.subject,
            html_content=email_data.html_content,
        )

    token, exp = generate_token(user.id)
    user = UserResponse(**user.alias_dict())

    return LoginResponse(user=user, token=token, expireAt=exp)
