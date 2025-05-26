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
      key: "government_agency.name",
      header: "Agency",
      render: (_, report) => report.government_agency?.name || "–",
    },
    {
      key: "report_category.name",
      header: "Category",
      render: (_, report) => report.report_category?.name || "–",
    },
    {
      key: "updatedAt",
      header: "Requester updated",
      render: (value) => new Date(value).toLocaleString(),
    },
  ];


  return <Table data={reports} columns={columns} />;
};

export default TableReport;
