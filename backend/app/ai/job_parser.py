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
    "Docker",
    "Linux",
    "REST API"
]


def extract_job_skills(text):

    skills = []

    for skill in SKILLS:
        if skill.lower() in text.lower():
            skills.append(skill)

    return skills