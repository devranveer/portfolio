
from fastapi import FastAPI

from app.database import Base, engine
from app.models.project import Project
from app.models.contact import Contact
from app.routers import projects, contact

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ranveer Portfolio API")

app.include_router(projects.router)
app.include_router(contact.router)


@app.get("/")
def home():
    return {"message": "Portfolio API is running!"}
