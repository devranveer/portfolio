
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.models.contact import Contact
from app.routers import contact

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ranveer Portfolio API")

# Allow requests from your GitHub Pages website.

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://portfolio-frontend-lilac-three.vercel.app",
        "https://devranveer.github.io",
        "https://portfolio-p6q3.onrender.com/api/contact/",
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type"],
)


app.include_router(contact.router)


@app.get("/")
def home():
    return {"message": "Portfolio API is running!"}
