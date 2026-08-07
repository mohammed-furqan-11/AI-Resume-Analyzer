import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function AnalysisCharts({ result }) {
  const pieData = [
    {
      name: "Matched",
      value: result.matched_skills.length,
    },
    {
      name: "Missing",
      value: result.missing_skills.length,
    },
  ];

  const barData = [
    {
      name: "ATS",
      score: result.ats_score,
    },
    {
      name: "Keyword",
      score: result.keyword_score,
    },
    {
      name: "Semantic",
      score: result.semantic_score,
    },
  ];

  const COLORS = ["#22c55e", "#ef4444"];

  return (
    <div className="grid lg:grid-cols-2 gap-8 mt-10">

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Skill Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>

            <Pie
              data={pieData}
              dataKey="value"
              outerRadius={100}
              label
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

            <Tooltip />

          </PieChart>
        </ResponsiveContainer>

      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">

        <h2 className="text-2xl font-bold mb-5">
          Score Comparison
        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={barData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="score"
              fill="#2563eb"
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default AnalysisCharts;