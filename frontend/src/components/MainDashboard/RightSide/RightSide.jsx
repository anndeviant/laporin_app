import { useState } from "react";
import axios from "axios";

import StatusSumary from "./StatusSumary";
import TableReport from "./TableReport";
import Pagination from "../../Table/Pagination";
import DetailReportForm from "../../Form/DetailFormReport";
import { BASE_URL } from "../../../utils";

const RightSide = ({ statusCountsToday, statusCountsWeek, reports }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const statuses = ["pending", "verified", "in_progress", "resolved", "rejected"];
  
  const perPage = 10;
  const totalPages = Math.ceil(reports.length / perPage);
  const paginatedData = reports.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const handleReportClick = async (id) => {
    setLoadingDetail(true);
    try {
      const res = await axios.get(`${BASE_URL}/admin/reports/${id}`);
      setSelectedReport(res.data);
    } catch (err) {
      alert("Gagal mengambil detail laporan.");
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleUpdateOrDelete = () => {
    window.location.reload(); // reload untuk refresh data dari server
  };
  return (
    <section className={`flex flex-col flex-auto min-h-full border-l overflow-${!selectedReport ? ("hidden") : ("auto")}`}>
      {/* Bagian Atas: Ringkasan + Pagination */}
      <section className="bg-gray-100 flex p-4">
        <StatusSumary
          countsToday={statusCountsToday}
          countsWeek={statusCountsWeek}
          statuse={statuses}
        />
        {!selectedReport && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </section>

      {/* Konten Utama */}
      <div className="p-4">
        {loadingDetail ? (
          <p>Loading detail...</p>
        ) : selectedReport ? (
          <>
            <div className="flex items-center mb-4">
              <button
                onClick={() => setSelectedReport(null)}
                className="mr-2 p-2 rounded hover:bg-gray-200"
                title="Kembali"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-bold text-center w-full">Halaman Detail Laporan</h1>
            </div>

            <DetailReportForm
              report={selectedReport}
              onUpdate={handleUpdateOrDelete}
              onDelete={handleUpdateOrDelete}
            />
          </>
        ) : (
          <TableReport
            reports={paginatedData}
            onReportClick={handleReportClick}
          />
        )}
      </div>
    </section>
  );
};

export default RightSide;
