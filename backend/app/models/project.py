
from sqlalchemy import Column, Integer, String, Text, JSON
from app.database import Base


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    technologies = Column(JSON, nullable=False)
    page = Column(String(255), nullable=False)
    github = Column(String(500), nullable=True)
