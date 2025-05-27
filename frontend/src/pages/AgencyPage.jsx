import Sidebar from "../components/Sidebar/Sidebar";
import TopBar from "../components/TopBar/TopBar";
import TableGovernmentAgency from "../components/Table/TableGovernmentAgency";
import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../utils";
import Pagination from "../components/Table/Pagination";
import InputField from "../components/Form/InputField";
import SelectField from "../components/Form/SelectField";

const AgencyPage = () => {
  const [agency, setAgency] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [newAgency, setNewAgency] = useState({
    name: "",
    division: "",
    contact: "",
    service_area: "",
    is_active: true,
  });

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
      const response = await axiosInstance.get(`${BASE_URL}/admin/agencies`);
      setAgency(response.data);
    } catch (error) {
      console.error("Gagal memuat agency:");
    }
  };

  const handleEdit = async (updatedAgency) => {
    try {
      await axiosInstance.patch(`${BASE_URL}/admin/agencies/${updatedAgency.id}`, updatedAgency)
        setAgency((prev) =>
          prev.map((ag) => (ag.id === updatedAgency.id ? updatedAgency : ag))
        )
    } catch (err) {
      alert("Gagal menyimpan perubahan.");
    }
  };


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`${BASE_URL}/admin/agencies/${id}`);
      setAgency((prev) => prev.filter((ag) => ag.id !== id));
    } catch (error) {
      console.error("Gagal menghapus agency:");
    }
  };

  const handleAddAgency = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`${BASE_URL}/admin/agencies`, newAgency);
      setIsAdding(false);
      setNewAgency({
        name: "",
        division: "",
        contact: "",
        service_area: "",
        is_active: true,
      })
      getAgencies();
    } catch (error) {
      console.error("Gagal menambahkan agency:");
      alert("Gagal menambahkan agency.");
    }
  };

  const handleNewChange = (field, value) => {
    setNewAgency((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
      <Sidebar activeItem={"agency"} />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <header className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center justify-between">
          <h1 className="font-semibold text-lg">Agency</h1>
        </header>

        <div className="w-full border-t bg-gray-100 px-4 pb-4 pt-2">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="w-full">
              {isAdding ? (
                <form onSubmit={handleAddAgency}>
                  <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700"
                    >
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsAdding(false)}
                      className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700"
                    >
                      Cancel
                    </button>

                    <div className="flex flex-wrap gap-4 items-center w-full">
                      <InputField
                        name="name"
                        placeholder="Agency Name"
                        value={newAgency.name}
                        onChange={(e) => handleNewChange("name", e.target.value)}
                        required
                      />
                      <InputField
                        name="division"
                        placeholder="Division"
                        value={newAgency.division}
                        onChange={(e) => handleNewChange("division", e.target.value)}
                        required
                      />
                      <InputField
                        name="contact"
                        placeholder="Contact"
                        value={newAgency.contact}
                        onChange={(e) => handleNewChange("contact", e.target.value)}
                        required
                      />
                      <InputField
                        name="service_area"
                        placeholder="Service Area"
                        value={newAgency.service_area}
                        onChange={(e) => handleNewChange("service_area", e.target.value)}
                        required
                      />
                      <SelectField
                        name="is_active"
                        value={newAgency.is_active ? "true" : "false"}
                        onChange={(e) =>
                          handleNewChange("is_active", e.target.value === "true")
                        }
                        options={[
                          { label: "Yes", value: "true" },
                          { label: "No", value: "false" },
                        ]}
                        required
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setIsAdding(true)}
                  className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                >
                  Add Agency
                </button>
              )}
            </div>

            <div className="w-full md:w-auto flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
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
