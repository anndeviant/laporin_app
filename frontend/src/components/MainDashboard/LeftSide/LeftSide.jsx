import { useState } from "react";
import ReportCard from "./ReportCard";

const LeftSide = ({ reports, onUpdateReport }) => {
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" or "desc"

  const sortedReports = [...reports].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.created_at || a.date);
    const dateB = new Date(b.createdAt || b.created_at || b.date);

    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });

  return (
    <section className="flex flex-col w-full max-w-sm flex-none bg-gray-100 min-h-0">
      <div className="sticky top-0 bg-gray-100 p-4 pb-3 flex justify-between items-center border-b border-gray-200">
        <h1 className="font-semibold">Pending Reports</h1>
        <div className="flex gap-1">
          <button
            onClick={() => setSortOrder("asc")}
            className={`px-2 py-1 text-xs rounded ${sortOrder === "asc"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            title="Sort by oldest first"
          >
            ↑
          </button>
          <button
            onClick={() => setSortOrder("desc")}
            className={`px-2 py-1 text-xs rounded ${sortOrder === "desc"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            title="Sort by newest first"
          >
            ↓
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-4 pt-3">
        <ul>
          {sortedReports
            .filter(report => report.status === "pending")
            .map((report, index) => (
              <li key={index}>
                <ReportCard {...report} onUpdate={onUpdateReport} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default LeftSide;
