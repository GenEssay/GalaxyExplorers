from contextlib import contextmanager

from sqlmodel import Session, SQLModel, create_engine, select

from app import crud
from app.core.config import app_config
from app.models import User, UserCreate
from app.utils import get_project_root_path


def get_db_url() -> str:
    """Get the database URL based on the environment. If the environment is dev, it will
    use SQLite, otherwise it will use PostgreSQL.

    Returns:
        str: The database URL.
    """
    if app_config.ENVIRONMENT == "local":
        return f"sqlite:///{get_project_root_path()}/database.db"

    # prod environment
    return f"postgresql://{app_config.POSTGRES_USER}:{app_config.POSTGRES_PASSWORD}@{app_config.POSTGRES_SERVER}/party"  # noqa


def create_db_and_tables():
    url = get_db_url()
    _engine = create_engine(url, echo=app_config.DB_DEBUG)

    SQLModel.metadata.create_all(_engine)
    return _engine


def init_db(session: Session) -> None:
    # Tables should be created with Alembic migrations
    # But if you don't want to use migrations, create
    # the tables un-commenting the next lines
    # from sqlmodel import SQLModel

    # from app.core.engine import engine
    # This works because the models are already imported and registered from app.models
    # SQLModel.metadata.create_all(engine)

    user = session.exec(
        select(User).where(User.email == app_config.FIRST_SUPERUSER)
    ).first()
    if not user:
        user_in = UserCreate(
            email=app_config.FIRST_SUPERUSER,
            password=app_config.FIRST_SUPERUSER_PASSWORD,
            is_superuser=True,
            full_name="Admin",
            age=18,
            brief_introduction="I am the admin",
        )
        crud.create_user(session=session, user_create=user_in)


@contextmanager
def get_session() -> Session:
    """Provide a transactional scope around a series of operations.

    Usage:
        with get_session() as session:
            session.add(user_1)
            session.commit()
    """
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()


engine = create_db_and_tables()
