import datetime
import os
import platform
import sys

from loguru import logger as _logger

from app.utils import get_project_root_path
from app.utils.singleton import Singleton


def get_log_name() -> str:
    if not os.path.exists(get_project_root_path()):
        os.makedirs(get_project_root_path())

    current_date = datetime.datetime.now()
    formatted_date = current_date.strftime("%Y%m%d")
    return f"{get_project_root_path()}/logs/{formatted_date}.log"


class Logger(metaclass=Singleton):
    def __init__(self) -> None:
        self.logger = _logger

        self.logger.remove()

        if platform.system() == "Windows":
            self.logger.add(get_log_name(), level="DEBUG", mode="a")
        self.logger.add(sys.stderr, level="DEBUG")


def exception_handler(exctype, value, traceback):
    logger.exception("Unhandled exception: ", exc_info=(exctype, value, traceback))


logger = Logger().logger
# sys.excepthook = exception_handler
