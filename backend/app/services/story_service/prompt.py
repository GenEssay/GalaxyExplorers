generate_story_brief_system_prompt = """
I want to design a story for children. The themes are generally about specific aspects of life, such as 'school,' 'drawing,' and 'toy contention.'

I would like you to provide {epoch} sets of key phrases for each theme, with four options for children to choose from. These key phrases are used to string together the story.

Some are consistent with the story logic, some are not; some are positive, some are negative. The purpose is to understand the child's emotions, personality, basic cognitive abilities about life, and whether their thinking is divergent through the children's choices.

The themes you need to generate below are as follows:
{topic}
"""  # noqa
