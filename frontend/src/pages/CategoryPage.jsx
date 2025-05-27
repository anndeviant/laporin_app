import TopBar from "../components/TopBar/TopBar";
import Sidebar from "../components/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { BASE_URL } from "../utils";
import Pagination from "../components/Table/Pagination";
import TableReportCategory from "../components/Table/TableReportCategory";
import InputField from "../components/Form/InputField";

const CategoryPage = () => {
    const [category, setCategory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isAdding, setIsAdding] = useState(false);
    const [newCategory, setNewCategory] = useState("");
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
            const response = await axiosInstance.get(`${BASE_URL}/admin/categories`);
            setCategory(response.data);
        } catch (error) {
            console.error("Gagal memuat kategori:");
        }
    };

    const handleEdit = async (updatedCategory) => {
        try {
            await axiosInstance.patch(`${BASE_URL}/admin/categories/${updatedCategory.id}`, { name: updatedCategory.name });
            setCategory((prev) =>
                prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
            );
        } catch (err) {
            alert("Gagal menyimpan perubahan.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`${BASE_URL}/admin/categories/${id}`);
            setCategory((prev) => prev.filter((cat) => cat.id !== id));
        } catch (error) {
            console.error("Gagal menghapus kategori:");
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`${BASE_URL}/admin/categories`, {
                name: newCategory,
            });
            setNewCategory("");
            setIsAdding(false);
            getCategories(); // agar tidak reload full page
        } catch (error) {
            console.error("Gagal menambahkan Category:");
            alert("Gagal menambahkan Category.");
        }
    };

    const handleNewChange = (e) => {
        setNewCategory(e.target.value);
    };

    return (
        <div className="h-screen w-full flex overflow-auto antialiased text-gray-800 bg-white">
            <Sidebar activeItem="category" />
            <div className="flex-1 flex flex-col">
                <TopBar />
                <header className="flex-none flex h-16 bg-gray-100 border-t px-4 items-center">
                    <h1 className="font-semibold text-lg">Category</h1>
                </header>

                <div className="w-full border-t bg-gray-100 px-4 pb-4 pt-2">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <form onSubmit={handleAddCategory} >
                            <div className="w-full">
                                {isAdding ? (
                                    <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                                        <button
                                            className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => {
                                                setIsAdding(false);
                                                setNewCategory("");
                                            }}
                                            className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700"
                                        >
                                            Cancel
                                        </button>
                                        <InputField
                                            name="name"
                                            placeholder="Category Name"
                                            value={newCategory}
                                            onChange={handleNewChange}
                                            required
                                        />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsAdding(true)}
                                        className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700"
                                    >
                                        Add Category
                                    </button>
                                )}
                            </div>
                        </form>

                        <div className="w-full md:w-auto flex justify-end">
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    </div>
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
