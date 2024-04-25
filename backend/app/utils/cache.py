from cushy_storage import CushyDict, CushyOrmCache
from cushy_storage.utils import get_project_root_path

from app.utils.singleton import Singleton


class Cache(CushyDict, metaclass=Singleton):
    def __init__(self):
        super().__init__(path=get_project_root_path() + "/.cache", serialize="pickle")


cache = Cache()
