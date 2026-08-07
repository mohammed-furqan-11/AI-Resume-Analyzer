from sentence_transformers import SentenceTransformer
from sentence_transformers.util import cos_sim

model = SentenceTransformer("all-MiniLM-L6-v2")


def semantic_match(resume_text, job_text):

    resume_embedding = model.encode(
        resume_text,
        convert_to_tensor=True
    )

    job_embedding = model.encode(
        job_text,
        convert_to_tensor=True
    )

    similarity = cos_sim(
        resume_embedding,
        job_embedding
    )

    return round(float(similarity[0][0]) * 100, 2)