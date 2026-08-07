def calculate_ats_score(match_score):

    ats_score = round(match_score)

    if ats_score > 100:
        ats_score = 100

    return ats_score