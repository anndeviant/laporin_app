const ReportHoverDetail = ({ report }) => {
  const statusColors = {
    pending: "bg-gray-400",
    verified: "bg-blue-600",
    in_progress: "bg-yellow-500",
    resolved: "bg-green-600",
    rejected: "bg-red-600",
  };

  return (
    <span
      className="hidden group-hover:block ml-4  w-full max-w-lg absolute mb-10 bottom-0 border shadow-lg p-6 bg-white rounded-md z-50 text-gray-900"
    >
      <article>
        <header>
          <div>
            <span className={`
            px-3 py-1 
            uppercase 
            text-xs 
            leading-none 
            rounded-sm 
            text-white 
            ${statusColors[report.status] || "bg-gray-400"
              }`}>
              {report.status}
            </span>
            <span className="ml-2 text-gray-700">Report #{report.id}</span>
            <span className="ml-1">{report.status}</span>
          </div>
        </header>
        <section className="mt-5">
          <h1 className="text-base font-semibold mt-3">{report.title}</h1>
          <p className="mt-2 whitespace-pre-line">{report.description}</p>
        </section>
        <footer className="mt-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <p>
              By <span className="font-semibold">{report.reporter_name}</span> ({report.reporter_contact})
            </p>
            <p>Diedit: {new Date(report.updatedAt).toLocaleString()}</p>
            <p>Dibuat: {new Date(report.createdAt).toLocaleString()}</p>
          </div>
          <p className="mt-1 italic">Location: {report.location}</p>
        </footer>
      </article>
    </span>
  );
}

export default ReportHoverDetail;