import TopBar from "../components/TopBar/TopBar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";
import Pagination from "../components/Table/Pagination";
import TableReportCategory from "../components/Table/TableReportCategory";

const CategoryPage = () => {
    const [category, setCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 10;

    const totalPages = Math.ceil(category.length / perPage);

    const paginatedData = category.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/admin/categories`);
            setCategory(response.data);
        } catch (error) {
            console.error("Gagal memuat kategori:", error);
        }
    };

    const handleEdit = (updatedCategory) => {
        setCategory((prev) =>
            prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/admin/categories/${id}`);
            setCategory((prev) => prev.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error("Gagal menghapus kategori:", error);
        }
    };

    return (
        <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
            <Sidebar activeItem={"category"} />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <header
                    aria-label="page caption"
                    className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center"
                >
                    <h1 id="page-caption" className="font-semibold text-lg">
                        Category
                    </h1>
                </header>
                <div className="bg-gray-100 justify-end flex pb-4 px-4 border-t">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
                <TableReportCategory
                    categories={paginatedData}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
};

export default CategoryPage;
