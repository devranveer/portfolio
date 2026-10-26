
from pydantic import BaseModel, EmailStr, Field, ConfigDict


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(min_length=5, max_length=3000)


class ContactResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    message: str

    model_config = ConfigDict(from_attributes=True)
