import { useState } from "react";
import Table from "./Table";
import InputField from "../Form/InputField";
import ConfirmDeleteModal from "../Modal/ConfirmDeleteModal";

const TableReportCategory = ({ categories, onEdit, onDelete }) => {
    const [editRowId, setEditRowId] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, category: null });

    const handleEditClick = (category) => {
        setEditRowId(category.id);
        setEditedName(category.name);
    };

    const handleCancelClick = () => {
        setEditRowId(null);
        setEditedName("");
    };

    const handleSaveClick = async (category) => {
        const updatedCategory = {
            ...category,
            name: editedName,
            updatedAt: new Date().toISOString(),
        };
        if (onEdit) onEdit(updatedCategory);
        setEditRowId(null);
    };

    const handleDeleteClick = (category) => {
        setDeleteModal({ isOpen: true, category });
    };

    const handleDeleteConfirm = () => {
        if (onDelete && deleteModal.category) {
            onDelete(deleteModal.category.id);
        }
        setDeleteModal({ isOpen: false, category: null });
    };

    const handleDeleteCancel = () => {
        setDeleteModal({ isOpen: false, category: null });
    };

    const columns = [
        { key: "id", header: "ID", className: "w-20 truncate" },
        {
            key: "name",
            header: "Category Name",
            className: "w-full max-w-md",
            render: (value, category) =>
                category.id === editRowId ? (
                    <InputField
                        name="name"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                    />
                ) : (
                    value
                ),
        },
        {
            key: "createdAt",
            header: "Created At",
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            key: "updatedAt",
            header: "Last Updated",
            render: (value) => new Date(value).toLocaleString(),
        },
        {
            key: "actions",
            header: "Actions",
            className: "w-40 text-center",
            render: (_, category) =>
                category.id === editRowId ? (
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => handleSaveClick(category)}
                            className="text-green-600 hover:underline text-sm"
                        >
                            Simpan
                        </button>
                        <button
                            onClick={handleCancelClick}
                            className="text-gray-500 hover:underline text-sm"
                        >
                            Batal
                        </button>
                    </div>
                ) : (
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={() => handleEditClick(category)}
                            className="text-blue-600 hover:underline text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => handleDeleteClick(category)}
                            className="text-red-600 hover:underline text-sm"
                        >
                            Delete
                        </button>
                    </div>
                ),
        },
    ];

    return (
        <>
            <Table data={categories} columns={columns} />
            <ConfirmDeleteModal
                isOpen={deleteModal.isOpen}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
                title="Hapus Kategori Laporan"
                message={`Apakah Anda yakin ingin menghapus kategori "${deleteModal.category?.name}"? Tindakan ini tidak dapat dibatalkan.`}
            />
        </>
    );
};

export default TableReportCategory;
