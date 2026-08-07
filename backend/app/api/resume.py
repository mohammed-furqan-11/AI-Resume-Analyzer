from fastapi import APIRouter, UploadFile, File
import shutil
import os

from app.ai.pdf_parser import extract_text_from_pdf
from app.ai.resume_parser import extract_resume_data

router = APIRouter()

UPLOAD_FOLDER = "app/uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    text = extract_text_from_pdf(file_path)

    resume_data = extract_resume_data(text)

    return resume_data