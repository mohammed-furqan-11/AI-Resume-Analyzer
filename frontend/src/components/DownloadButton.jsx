import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function DownloadButton({ result }) {

  const downloadPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("AI Resume Analyzer Report", 20, 20);

    doc.setFontSize(14);

    doc.text(
      `Candidate : ${result.candidate.name}`,
      20,
      40
    );

    doc.text(
      `Email : ${result.candidate.email}`,
      20,
      50
    );

    doc.text(
      `Phone : ${result.candidate.phone}`,
      20,
      60
    );

    autoTable(doc, {

      startY: 80,

      head: [["Score", "Value"]],

      body: [

        ["ATS Score", result.ats_score + "%"],

        ["Keyword Score", result.keyword_score + "%"],

        ["Semantic Score", result.semantic_score + "%"],

        ["Final Match", result.final_match_score + "%"],

      ],

    });

    autoTable(doc, {

      startY: doc.lastAutoTable.finalY + 20,

      head: [["Matched Skills"]],

      body: result.matched_skills.map(skill => [skill])

    });

    autoTable(doc, {

      startY: doc.lastAutoTable.finalY + 20,

      head: [["Missing Skills"]],

      body: result.missing_skills.map(skill => [skill])

    });

    doc.save("AI_Resume_Report.pdf");

  };

  return (

    <div className="flex justify-center mt-10">

      <button
        onClick={downloadPDF}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
      >
        Download PDF Report
      </button>

    </div>

  );

}

export default DownloadButton;