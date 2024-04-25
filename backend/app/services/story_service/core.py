from typing import List

from pydantic import BaseModel, Field

from app.services.img_gen_service import fal
from app.services.llm_service import chat
from app.services.story_service import prompt
from app.utils.logger import logger


class BasePlotBrief(BaseModel):
    title: str = Field(..., title="The title of the story, brief and clear.")
    description: str = Field(..., title="The description of the plot")


class Step(BaseModel):
    plot_1: BasePlotBrief = Field(..., title="The first plot of the story")
    plot_2: BasePlotBrief = Field(..., title="The second plot of the story")
    plot_3: BasePlotBrief = Field(..., title="The third plot of the story")
    plot_4: BasePlotBrief = Field(..., title="The fourth plot of the story")


class PlotBrief(BasePlotBrief):
    url: str = Field(..., title="The URL of the image")
    extended_description: List[str] = Field(
        ..., title="The extended description of the plot"
    )

    @property
    def final_description(self) -> str:
        return " ".join(self.extended_description)


class StoryBrief(BaseModel):
    """LLM Response of StoryBriefGenerator"""

    steps: List[Step] = Field(
        ..., title="The step of the response. Each step contains 4 plots."
    )


class StoryBriefGenerator:
    """
    Generate the story brief for the user to choose the plot.
    """

    def __init__(self, step_num: int):
        self.step_num: int = step_num

        self.max_retry: int = 2

    def generate(self, topic: str) -> StoryBrief:
        """Generate the story brief for the user to choose the plot.

        Args:
            topic(str): The topic of the story.

        Returns:
            StoryBrief: The response of the story brief.
        """
        logger.info(f"Generate story brief of epoch {self.step_num} with topic {topic}")
        system_prompt: str = prompt.generate_story_brief_system_prompt.format(
            epoch=self.step_num, topic=topic
        )
        resp: StoryBrief = chat(messages=system_prompt, output_schema=StoryBrief)

        current_iter: int = 0
        while self._should_retry(resp, current_iter):
            current_iter += 1
            resp: StoryBrief = chat(messages=system_prompt, output_schema=StoryBrief)

        return resp

    def _should_retry(self, resp: StoryBrief, current_iter: int) -> bool:
        logger.info(f"Retry generate story brief, current_iter: {current_iter}")
        logger.info(f"Unexpected response: {resp.dict()}")
        return len(resp.steps) != self.step_num and current_iter < self.max_retry


class StoryManager:
    """StoryManager aim to manage the story generation process, generate the image and
    generate the final description of the story for StoryGenerator."""

    def __init__(self, steps: List[Step]):
        self.steps: List[Step] = steps
        self._plots: List[PlotBrief] = []

    @property
    def plots(self):
        if not self._plots:
            raise ValueError("Plots are not generated yet.")

        return self._plots

    @property
    def story_description(self) -> str:
        """Generate the final description of the story for generating the story video.

        Returns:
            str: The final description of the story.
        """
        return "".join([plot.final_description for plot in self._plots])

    def choose_plot(self, choices: List[int]):
        """Choose the plot from the steps and generate the image.

        Args:
            choices(List[int]): The choices of the plot. If a choice is 0, then choose
                the first plot of current step.

        Returns:
            None
        """
        logger.info(f"Choose plot from steps: {choices}")

        for i in choices:
            if i == 0:
                selected_plot: BasePlotBrief = self.steps[i].plot_1
            elif i == 1:
                selected_plot: BasePlotBrief = self.steps[i].plot_2
            elif i == 2:
                selected_plot: BasePlotBrief = self.steps[i].plot_3
            elif i == 3:
                selected_plot: BasePlotBrief = self.steps[i].plot_4
            else:
                raise ValueError("Invalid choice")

            img_url: str = fal.generate(prompt=selected_plot.description)
            self._plots.append(
                PlotBrief(**selected_plot.dict(), url=img_url, extended_description=[])
            )

            logger.info(f"Current plot: {self._plots[-1]}")


class StoryGenerator:
    def __init__(self):
        ...
