import { useState } from "react";

const ReportCard = ({
  id,
  title,
  description,
  reporter_name,
  createdAt,
  location,
  government_agency,
  report_category,
  onUpdate
}) => {
  const [loading, setLoading] = useState(false);

  const kirimPerubahan = async (data) => {
    const updatedData = {
      id,
      title,
      description,
      reporter_name,
      createdAt,
      location,
      government_agency,
      report_category,
      ...data,
      updatedAt: new Date().toISOString(),
    };
    if (onUpdate) onUpdate(updatedData);
  };


  const tanganiLaporan = async () => {
    const data = {
      status: "in_progress",
    };
    await kirimPerubahan(data);
  };
  return (
    <article
      tabIndex="0"
      className="cursor-pointer border rounded-md p-3 bg-white flex flex-col text-gray-700 mb-2 hover:border-green-500 focus:outline-none focus:border-green-500"
    >
      <header className="mb-1">
        <span className="font-semibold">{reporter_name}</span> reported{" "}
        <h1 className="inline">"{title}"</h1>
      </header>
      <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
      <span className="mt-1 text-xs italic text-gray-500">Agency: {government_agency?.name || "–"}</span>
      <span className="mt-1 text-xs italic text-gray-500">Category: {report_category?.name || "–"}</span>
      <div className="flex justify-between mt-2 text-sm text-gray-500">
        <span>{new Date(createdAt).toLocaleString()}</span>
      </div>
      <div className="text-xs mt-1 text-gray-400 italic">{location}</div>
      <button
        onClick={tanganiLaporan}
        disabled={loading}
        className="mt-3 self-end text-sm px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Memproses..." : "Terima Laporan"}
      </button>
    </article>
  );
};

export default ReportCard;
