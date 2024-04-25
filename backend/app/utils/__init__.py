import os


def convert_backslashes(path: str):
    """Convert all \\ to / of file path."""
    return path.replace("\\", "/")


def get_project_root_path() -> str:
    """get project root path or current path"""
    project_path = os.getcwd()
    max_depth = 10
    count = 0
    while not os.path.exists(os.path.join(project_path, "README.md")):
        project_path = os.path.split(project_path)[0]
        count += 1
        if count > max_depth:
            return os.getcwd()
    return convert_backslashes(project_path)
