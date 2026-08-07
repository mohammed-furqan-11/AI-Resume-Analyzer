function ScoreCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center">

      <h2 className="text-xl font-bold text-gray-700">
        {title}
      </h2>

      <h1
        className="text-5xl font-bold mt-4"
        style={{ color }}
      >
        {value}
      </h1>

    </div>
  );
}

export default ScoreCard;