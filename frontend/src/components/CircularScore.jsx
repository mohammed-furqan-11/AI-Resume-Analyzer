import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function CircularScore({ title, value, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">

      <h2 className="text-xl font-bold mb-5">
        {title}
      </h2>

      <div className="w-36 h-36">
        <CircularProgressbar
          value={value}
          text={`${value}%`}
          styles={buildStyles({
            pathColor: color,
            textColor: color,
            trailColor: "#e5e7eb",
          })}
        />
      </div>

    </div>
  );
}

export default CircularScore;