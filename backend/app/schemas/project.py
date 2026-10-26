
from pydantic import BaseModel, Field, ConfigDict


class ProjectBase(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    category: str = Field(min_length=2, max_length=100)
    description: str = Field(min_length=10, max_length=5000)
    technologies: list[str] = Field(min_length=1)
    page: str = Field(min_length=1, max_length=255)
    github: str | None = None


class ProjectCreate(ProjectBase):
    pass


class ProjectUpdate(BaseModel):
    name: str | None = Field(default=None, min_length=2, max_length=100)
    category: str | None = Field(default=None, min_length=2, max_length=100)
    description: str | None = Field(default=None, min_length=10, max_length=5000)
    technologies: list[str] | None = Field(default=None, min_length=1)
    page: str | None = Field(default=None, min_length=1, max_length=255)
    github: str | None = None


class ProjectResponse(ProjectBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
