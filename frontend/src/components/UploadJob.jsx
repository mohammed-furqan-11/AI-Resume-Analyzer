import { useState } from "react";

function UploadJob({ setJob }) {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setJob(file);

    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4">
        Upload Job Description
      </h2>

      <input
        type="file"
        accept=".txt"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <p className="mt-3 text-blue-600">
        {fileName}
      </p>

    </div>
  );
}

export default UploadJob;