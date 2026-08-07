from fastapi import APIRouter, UploadFile, File, Depends
from sqlalchemy.orm import Session
import shutil
import os

from app.database.database import get_db
from app.models.analysis import Analysis

from app.ai.pdf_parser import extract_text_from_pdf
from app.ai.resume_parser import extract_resume_data
from app.ai.job_parser import extract_job_skills
from app.ai.skill_matcher import match_skills
from app.ai.semantic_matcher import semantic_match
from app.ai.ats_score import calculate_ats_score

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/analyze")
async def analyze_resume(
    resume: UploadFile = File(...),
    job_description: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    resume_path = os.path.join(
        UPLOAD_FOLDER,
        resume.filename
    )

    with open(resume_path, "wb") as buffer:
        shutil.copyfileobj(
            resume.file,
            buffer
        )

    resume_text = extract_text_from_pdf(
        resume_path
    )

    resume_data = extract_resume_data(
        resume_text
    )

    jd_text = (
        await job_description.read()
    ).decode("utf-8")

    job_skills = extract_job_skills(
        jd_text
    )

    keyword_result = match_skills(
        resume_data["skills"],
        job_skills
    )

    semantic_score = semantic_match(
        resume_text,
        jd_text
    )

    final_score = round(
        (
            keyword_result["match_score"] * 0.4
            +
            semantic_score * 0.6
        ),
        2
    )

    ats_score = calculate_ats_score(
        final_score
    )

    analysis = Analysis(
        candidate_name=resume_data["name"],
        email=resume_data["email"],
        phone=resume_data["phone"],
        ats_score=ats_score,
        keyword_score=keyword_result["match_score"],
        semantic_score=semantic_score,
        final_match_score=final_score,
        matched_skills=", ".join(keyword_result["matched_skills"]),
        missing_skills=", ".join(keyword_result["missing_skills"])
    )

    db.add(analysis)
    db.commit()
    db.refresh(analysis)

    return {
        "candidate": resume_data,
        "job_skills": job_skills,
        "matched_skills": keyword_result["matched_skills"],
        "missing_skills": keyword_result["missing_skills"],
        "keyword_score": keyword_result["match_score"],
        "semantic_score": semantic_score,
        "final_match_score": final_score,
        "ats_score": ats_score
    }
@router.get("/history")
def get_history(db: Session = Depends(get_db)):

    history = db.query(Analysis).all()

    return history