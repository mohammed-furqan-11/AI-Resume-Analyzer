import re
import math
from collections import Counter


def _tokenize(text):
    """Convert text into normalized words."""
    if not text:
        return []

    words = re.findall(r"[a-zA-Z0-9+#.]+", text.lower())

    stop_words = {
        "the", "a", "an", "and", "or", "but", "if", "of",
        "to", "in", "on", "for", "with", "as", "at", "by",
        "is", "are", "was", "were", "be", "been", "this",
        "that", "from", "it", "its", "we", "our", "you",
        "your", "they", "their", "will", "can", "have",
        "has", "had"
    }

    return [word for word in words if word not in stop_words]


def _cosine_similarity(tokens1, tokens2):
    """Calculate cosine similarity between two word-frequency vectors."""
    counter1 = Counter(tokens1)
    counter2 = Counter(tokens2)

    common_words = set(counter1) & set(counter2)

    if not common_words:
        return 0.0

    dot_product = sum(
        counter1[word] * counter2[word]
        for word in common_words
    )

    magnitude1 = math.sqrt(
        sum(value ** 2 for value in counter1.values())
    )

    magnitude2 = math.sqrt(
        sum(value ** 2 for value in counter2.values())
    )

    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0

    return dot_product / (magnitude1 * magnitude2)


def semantic_match(resume_text, job_text):
    """
    Compare resume and job description using
    lightweight text similarity.

    Returns a match percentage from 0 to 100.
    """

    resume_tokens = _tokenize(resume_text)
    job_tokens = _tokenize(job_text)

    similarity = _cosine_similarity(
        resume_tokens,
        job_tokens
    )

    return round(similarity * 100, 2)