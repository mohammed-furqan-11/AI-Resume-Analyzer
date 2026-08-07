import AnalysisCharts from "../components/AnalysisCharts";
import { useState } from "react";
import Navbar from "../components/Navbar";
import UploadResume from "../components/UploadResume";
import UploadJob from "../components/UploadJob";
import CircularScore from "../components/CircularScore";
import SkillCard from "../components/SkillCard";
import SuggestionCard from "../components/SuggestionCard";
import api from "../services/api";

function Home() {
  const [resume, setResume] = useState(null);
  const [job, setJob] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeResume = async () => {
    if (!resume || !job) {
      alert("Please upload both Resume and Job Description.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", job);

    try {
      const response = await api.post("/analyze", formData);
      setResult(response.data);
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(JSON.stringify(error.response.data));
      } else {
        alert("Backend server is not responding.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">

      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-5xl font-bold text-center text-blue-700">
          AI Resume Analyzer
        </h1>

        <p className="text-center text-gray-600 mt-3 text-lg">
          Upload your Resume and Job Description
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <UploadResume setResume={setResume} />
          <UploadJob setJob={setJob} />
        </div>

        <div className="flex justify-center mt-10">

          <button
            onClick={analyzeResume}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-10 py-4 rounded-xl text-xl shadow-lg transition-all"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>

        </div>

        {result && (

          <div className="mt-16">

            <h2 className="text-3xl font-bold text-center mb-10">
              Analysis Dashboard
            </h2>

            {/* Score Cards */}

            <div className="grid lg:grid-cols-3 gap-8">

              <CircularScore
                title="ATS Score"
                value={result.ats_score}
                color="#16a34a"
              />

              <CircularScore
                title="Keyword Score"
                value={result.keyword_score}
                color="#2563eb"
              />

              <CircularScore
                title="Semantic Score"
                value={result.semantic_score}
                color="#ea580c"
              />

            </div>

            {/* Skills */}

            <div className="grid lg:grid-cols-2 gap-8 mt-10">

              <SkillCard
                title="Matched Skills"
                skills={result.matched_skills}
                color="#16a34a"
              />

              <SkillCard
                title="Missing Skills"
                skills={result.missing_skills}
                color="#dc2626"
              />

            </div>

            {/* AI Suggestions */}

            <SuggestionCard
              missingSkills={result.missing_skills}
            />

            {/* Candidate Details */}

            <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

              <h2 className="text-2xl font-bold mb-6">
                Candidate Information
              </h2>

              <div className="space-y-4">

                <p>
                  <strong>Name:</strong> {result.candidate.name}
                </p>

                <p>
                  <strong>Email:</strong> {result.candidate.email}
                </p>

                <p>
                  <strong>Phone:</strong> {result.candidate.phone}
                </p>

                <p>
                  <strong>Final Match Score:</strong>{" "}
                  {result.final_match_score}%
                </p>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Home;