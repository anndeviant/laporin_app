import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/TopBar/TopBar";
import TableGovernmentAgency from "../components/Table/TableGovernmentAgency";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import Pagination from "../components/Table/Pagination";

const AgencyPage = () => {
  const [agency, setAgency] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 10;

  const totalPages = Math.ceil(agency.length / perPage);

  const paginatedData = agency.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  useEffect(() => {
    getAgencies();
  }, []);

  const getAgencies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/agencies`);
      setAgency(response.data);
    } catch (error) {
      console.error("Gagal memuat agency:", error);
    }
  };

  const handleEdit = (updatedAgency) => {
    setAgency((prev) =>
      prev.map((ag) => (ag.id === updatedAgency.id ? updatedAgency : ag))
    );
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/admin/agencies/${id}`);
      setAgency((prev) => prev.filter((ag) => ag.id !== id));
    } catch (error) {
      console.error("Gagal menghapus agency:", error);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
      <Sidebar activeItem={"agency"} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <header
          aria-label="page caption"
          className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center"
        >
          <h1 id="page-caption" className="font-semibold text-lg">
            Agency
          </h1>
        </header>
        <div className="bg-gray-100 justify-end flex pb-4 px-4 border-t">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
        <TableGovernmentAgency
          agencies={paginatedData}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AgencyPage;
