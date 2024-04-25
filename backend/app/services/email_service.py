import logging
from dataclasses import dataclass
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any

import emails  # type: ignore
from jinja2 import Template
from jose import JWTError, jwt

from app.core.config import app_config
from app.utils import get_project_root_path


@dataclass
class EmailData:
    html_content: str
    subject: str


def render_email_template(*, template_name: str, context: dict[str, Any]) -> str:
    template_path = (
        f"{get_project_root_path()}/app/email-templates/build/{template_name}"
    )
    template_str = Path(template_path).read_text()

    html_content = Template(template_str).render(context)
    return html_content


def send_email(
    *,
    email_to: str,
    subject: str = "",
    html_content: str = "",
) -> None:
    assert app_config.emails_enabled, "no provided configuration for email variables"
    message = emails.Message(
        subject=subject,
        html=html_content,
        mail_from=(app_config.EMAILS_FROM_NAME, app_config.EMAILS_FROM_EMAIL),
    )
    smtp_options = {"host": app_config.SMTP_HOST, "port": app_config.SMTP_PORT}
    if app_config.SMTP_TLS:
        smtp_options["tls"] = True
    elif app_config.SMTP_SSL:
        smtp_options["ssl"] = True
    if app_config.SMTP_USER:
        smtp_options["user"] = app_config.SMTP_USER
    if app_config.SMTP_PASSWORD:
        smtp_options["password"] = app_config.SMTP_PASSWORD
    response = message.send(to=email_to, smtp=smtp_options)
    logging.info(f"send email result: {response}")


def generate_test_email(email_to: str) -> EmailData:
    project_name = app_config.PROJECT_NAME
    subject = f"{project_name} - Test email"
    html_content = render_email_template(
        template_name="test_email.html",
        context={"project_name": app_config.PROJECT_NAME, "email": email_to},
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_reset_password_email(email_to: str, email: str, token: str) -> EmailData:
    project_name = app_config.PROJECT_NAME
    subject = f"{project_name} - Password recovery for user {email}"
    link = f"{app_config.server_host}/reset-password?token={token}"
    html_content = render_email_template(
        template_name="reset_password.html",
        context={
            "project_name": app_config.PROJECT_NAME,
            "username": email,
            "email": email_to,
            "valid_hours": app_config.EMAIL_RESET_TOKEN_EXPIRE_HOURS,
            "link": link,
        },
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_new_account_email(
    email_to: str, username: str, password: str
) -> EmailData:
    project_name = app_config.PROJECT_NAME
    subject = f"{project_name} - New account for user {username}"
    html_content = render_email_template(
        template_name="new_account.html",
        context={
            "project_name": app_config.PROJECT_NAME,
            "username": username,
            "password": password,
            "email": email_to,
            "link": app_config.server_host,
        },
    )
    return EmailData(html_content=html_content, subject=subject)


def generate_password_reset_token(email: str) -> str:
    delta = timedelta(hours=app_config.EMAIL_RESET_TOKEN_EXPIRE_HOURS)
    now = datetime.utcnow()
    expires = now + delta
    exp = expires.timestamp()
    encoded_jwt = jwt.encode(
        {"exp": exp, "nbf": now, "sub": email},
        app_config.SECRET_KEY,
        algorithm="HS256",
    )
    return encoded_jwt


def verify_password_reset_token(token: str) -> str | None:
    """Verify the password reset token and return the email if the token is valid

    Args:
        token: The token to verify.

    Returns:
        The email if the token is valid, None otherwise
    """
    try:
        decoded_token = jwt.decode(token, app_config.SECRET_KEY, algorithms=["HS256"])
        return str(decoded_token["sub"])
    except JWTError:
        return None
