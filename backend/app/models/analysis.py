from sqlalchemy import Column, Integer, String, Float, Text

from app.database.database import Base


class Analysis(Base):
    __tablename__ = "analysis"

    id = Column(Integer, primary_key=True, index=True)

    candidate_name = Column(String)

    email = Column(String)

    phone = Column(String)

    ats_score = Column(Integer)

    keyword_score = Column(Float)

    semantic_score = Column(Float)

    final_match_score = Column(Float)

    matched_skills = Column(Text)

    missing_skills = Column(Text)