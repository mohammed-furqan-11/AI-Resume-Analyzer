from fastapi import APIRouter, UploadFile, File

from app.ai.job_parser import extract_job_skills

router = APIRouter()


@router.post("/upload-job-description")
async def upload_job_description(file: UploadFile = File(...)):

    text = (await file.read()).decode("utf-8")

    skills = extract_job_skills(text)

    return {
        "status": "success",
        "job_description": text,
        "job_skills": skills
    }