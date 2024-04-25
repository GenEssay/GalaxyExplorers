import base64
import json
import logging
import os
from typing import TYPE_CHECKING, Dict, List, TypeVar, Union

import promptulate as pne

from app.core.config import app_config
from app.utils.cache import cache

if TYPE_CHECKING:
    from pydantic import BaseModel  # noqa

T = TypeVar("T", bound="BaseModel")


def _custom_serializer(obj):
    """
    Custom serialization for objects that are not serializable by default.
    You can define your own serialization here based on the type of the object.
    """
    if hasattr(obj, "serialize") and callable(obj.serialize):
        return obj.serialize()
    elif hasattr(obj, "__dict__"):
        return obj.__dict__
    elif isinstance(obj, (str, int, float, bool)):
        return obj
    else:
        # Fallback to string representation if no custom serialization is defined
        return str(obj)


def chat(
    messages: Union[List[Dict[str, str]], str], enable_raw_data: bool = False, **kwargs
) -> Union[str, pne.AssistantMessage, T]:
    """Chat with the LLM model.

    Doc: https://undertone0809.github.io/promptulate/#/use_cases/chat_usage

    Args:
        messages(Union[List[Dict[str, str]], str]): chat messages. It can be str or
            OpenAI API type data(List[Dict]).

            examples:
            - str: "Hello, I am a chatbot. What can I help you with today?"
            - List[Dict]: [
                {"content": "You are a helpful assistant.", "role": "system"},
                {"content": "Hello, I am a chatbot. What can I help you with today?",
                "role": "user"},
            ]
        enable_raw_data(bool): enable raw data. Default is False.

    Returns:
        Return str if enable_raw_data is False, otherwise return pne.AssistantMessage.
    """
    params = {
        "messages": messages,
        "model": app_config.MODEL_ID,
        **kwargs,
    }

    if enable_raw_data:
        params["enable_raw_data"] = True

    if app_config.LLM_MODEL == "OPENAI":
        params["model_config"] = (
            {"base_url": app_config.OPENAI_BASE_URL}
            if app_config.OPENAI_BASE_URL
            else {}
        )
    elif app_config.LLM_MODEL == "VERTEX":
        import litellm

        litellm.vertex_project = os.environ["VERTEX_PROJECT"]
        litellm.vertex_location = os.environ["VERTEX_LOCATION"]
    else:
        raise ValueError("Invalid LLM model")

    _ = json.dumps(params, sort_keys=True, default=_custom_serializer).encode("utf-8")
    base64_key = base64.b64encode(_).decode("utf-8")[-10]

    # cache the result
    if base64_key in cache:
        logging.info(f"cache hit, cache key: {base64_key}")
        return cache[base64_key]

    result = pne.chat(**params)
    cache[base64_key] = result
    logging.info(f"ready to cache, cache key: {base64_key}")

    return result
