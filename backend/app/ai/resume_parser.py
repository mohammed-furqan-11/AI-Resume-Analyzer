import re
import spacy

nlp = spacy.load("en_core_web_sm")

SKILLS = [
    "Python",
    "Java",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "HTML",
    "CSS",
    "SQL",
    "MongoDB",
    "Git",
    "GitHub",
    "FastAPI",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "AWS",
    "Azure",
    "Docker"
]


def extract_resume_data(text):
    doc = nlp(text)

    name = ""

    for ent in doc.ents:
        if ent.label_ == "PERSON":
            name = ent.text
            break

    email = ""

    email_match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text
    )

    if email_match:
        email = email_match.group()

    phone = ""

    phone_match = re.search(
        r"(\+91[- ]?)?[6-9]\d{9}",
        text
    )

    if phone_match:
        phone = phone_match.group()

    skills = []

    for skill in SKILLS:
        if skill.lower() in text.lower():
            skills.append(skill)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills
    }