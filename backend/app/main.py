import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.resume import router as resume_router
from app.api.job_description import router as jd_router
from app.api.analyzer import router as analyzer_router

from app.database.database import engine
from app.models.analysis import Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="AI Resume Analyzer API",
    version="2.0.0"
)

allowed_origins = [
    "http://localhost:5173",
    "http://localhost:5175"
]

frontend_url = os.getenv("FRONTEND_URL")
if frontend_url:
    allowed_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(resume_router)
app.include_router(jd_router)
app.include_router(analyzer_router)


@app.get("/")
async def home():
    return {
        "status": "success",
        "message": "AI Resume Analyzer Running Successfully"
    }