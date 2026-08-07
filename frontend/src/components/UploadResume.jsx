import { useState } from "react";

function UploadResume({ setResume }) {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    setResume(file);

    if (file) {
      setFileName(file.name);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">

      <h2 className="text-2xl font-bold mb-4">
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <p className="mt-3 text-blue-600">
        {fileName}
      </p>

    </div>
  );
}

export default UploadResume;