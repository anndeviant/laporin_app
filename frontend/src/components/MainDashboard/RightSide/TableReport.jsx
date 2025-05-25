import Table from "../../Table/Table";
import ReportHoverDetail from "./ReportHoverDetail";

const TableReport = ({ reports, onReportClick }) => {
  const columns = [
    { key: "id", header: "ID", className: "w-24 truncate" },
    {
      key: "title",
      header: "Subject",
      className: "w-full max-w-xs xl:max-w-lg",
      render: (value, report) => (
        <div
          onClick={() => onReportClick?.(report.id)}
          className="w-full max-w-full cursor-pointer hover:underline"
        >
          <div className="relative group w-full">
            <p>{value}</p>
            <ReportHoverDetail report={report} />
          </div>
        </div>
      ),
    },
    { key: "reporter_name", header: "Requester" },
    {
      key: "updatedAt",
      header: "Requester updated",
      render: (value) => new Date(value).toLocaleString(),
    },
  ];

  return <Table data={reports} columns={columns} />;
};

export default TableReport;
