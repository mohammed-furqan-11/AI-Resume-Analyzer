import { FaLightbulb } from "react-icons/fa";

function SuggestionCard({ missingSkills }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-10">

      <h2 className="text-2xl font-bold text-yellow-600 flex items-center gap-3 mb-6">
        <FaLightbulb />
        <span>AI Resume Suggestions</span>
      </h2>

      {missingSkills.length === 0 ? (
        <div className="bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg">
          🎉 Excellent! Your resume already contains all the required skills.
        </div>
      ) : (
        <ul className="space-y-4">

          {missingSkills.map((skill, index) => (

            <li
              key={index}
              className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg"
            >
              <strong>{skill}</strong>
              {" "}is missing from your resume. Consider learning it,
              building a project using it, and mentioning it in your resume
              to improve your ATS score.
            </li>

          ))}

        </ul>
      )}

    </div>
  );
}

export default SuggestionCard;