import base64
import json
from random import randint
from typing import Optional

import requests

from app.core.config import app_config
from app.utils.cache import cache

__all__ = ["generate"]


def generate(
    *, prompt: str, image: Optional[str] = None, seed: Optional[int] = None
) -> str:
    """Generate image from prompt and image.

    Args:
        prompt(str): prompt text.
        image(Optional[str]): image url.
        seed(int): random seed.

    Returns:
        Return generated image url.
    """
    seed = seed or randint(0, 100000)

    arguments = {
        "model": "sdv1-5",
        "prompt": prompt,
        "image_url": image,
        "strength": 0.8,
        "seed": seed,
        "guidance_scale": 1,
        "num_inference_steps": 10,
        "image_size": {"width": 512, "height": 512},
        "num_images": 1,
        "enable_safety_checks": True,
        "request_id": "",
        "lora_scale": 1,
    }

    _ = json.dumps(arguments, sort_keys=True).encode("utf-8")
    base64_key = base64.b64encode(_).decode("utf-8")[:10]

    # cache the result
    if base64_key in cache:
        return cache[base64_key]

    headers = {
        "User-Agent": "Fal/Python",
        "Content-Type": "application/json",
        "Authorization": f"Key {app_config.FAL_KEY_ID}:{app_config.FAL_KEY_SECRET}",
    }
    response = requests.post(
        url=app_config.FAL_BASE_URL, json=arguments, headers=headers
    )
    if response.status_code == 200:
        result = response.json()["images"][0]["url"]
        cache[base64_key] = result

        return result

    raise Exception(f"Error when generate image, reason: {response.text}")
