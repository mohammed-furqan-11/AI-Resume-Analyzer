function SkillCard({ title, skills, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2
        className="text-2xl font-bold mb-5"
        style={{ color }}
      >
        {title}
      </h2>

      <div className="flex flex-wrap gap-3">

        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-gray-100 px-4 py-2 rounded-full border border-gray-300 text-gray-700"
          >
            {skill}
          </div>
        ))}

      </div>

    </div>
  );
}

export default SkillCard;