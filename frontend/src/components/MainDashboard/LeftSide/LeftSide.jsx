import ReportCard from "./ReportCard";

const LeftSide = ({ reports }) => {
  return (
    <section className="flex flex-col p-4 w-full max-w-sm flex-none bg-gray-100 min-h-0 overflow-auto">
      <h1 className="font-semibold mb-3">Pending Reports</h1>
      <ul>
        {reports
        .filter(report => report.status === "pending")
        .map((report, index) => (
          <li key={index}>
            <ReportCard {...report} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default LeftSide;
