import os

import replicate as replicate_api

from app.core.config import app_config

__all__ = ["generate"]


def generate(prompt: str, image: str, seed) -> str:
    os.environ["REPLICATE_API_TOKEN"] = app_config.REPLICATE_API_TOKEN
    input_dict = {
        "width": 768,
        "height": 768,
        "prompt": prompt,
        "refine": "base_image_refiner",
        "scheduler": "K_EULER",
        "num_outputs": 1,
        "guidance_scale": 7.5,
        "high_noise_frac": 0.8,
        "prompt_strength": 0.8,
        "num_inference_steps": 25,
    }

    if len(image) > 0:
        input_dict["image"] = image

    output = replicate_api.run(app_config.REPLICATE_MODEL, input=input_dict)
    return output[0]
