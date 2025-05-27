import { useState } from "react";
import Table from "./Table";
import InputField from "../Form/InputField";
import SelectField from "../Form/SelectField";

const TableGovernmentAgency = ({ agencies, onEdit, onDelete }) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (agency) => {
    setEditRowId(agency.id);
    setEditData({
      name: agency.name,
      division: agency.division,
      contact: agency.contact,
      service_area: agency.service_area,
      is_active: agency.is_active,
    });
  };

  const cancelEdit = () => {
    setEditRowId(null);
    setEditData({});
  };

  const saveEdit = async (agency) => {
    const updatedAgency = {
      ...agency,
      ...editData,
      updatedAt: new Date().toISOString(),
    };
    if (onEdit) onEdit(updatedAgency);
    cancelEdit();
  };

  const handleChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const columns = [
    { key: "id", header: "ID", className: "w-20 truncate" },
    {
      key: "name",
      header: "Agency Name",
      className: "w-full max-w-xs xl:max-w-lg",
      render: (value, agency) =>
        agency.id === editRowId ? (
          <InputField
            name="name"
            value={editData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        ) : (
          value
        ),
    },
    {
      key: "division",
      header: "Division",
      render: (value, agency) =>
        agency.id === editRowId ? (
          <InputField
            name="division"
            value={editData.division}
            onChange={(e) => handleChange("division", e.target.value)}
          />
        ) : (
          value
        ),
    },
    {
      key: "contact",
      header: "Contact",
      render: (value, agency) =>
        agency.id === editRowId ? (
          <InputField
            name="contact"
            value={editData.contact}
            onChange={(e) => handleChange("contact", e.target.value)}
          />
        ) : (
          value
        ),
    },
    {
      key: "service_area",
      header: "Service Area",
      render: (value, agency) =>
        agency.id === editRowId ? (
          <InputField
            name="service_area"
            value={editData.service_area}
            onChange={(e) => handleChange("service_area", e.target.value)}
          />
        ) : (
          value
        ),
    },
    {
      key: "is_active",
      header: "Active",
      render: (value, agency) =>
        agency.id === editRowId ? (
          <SelectField
            name="is_active"
            value={editData.is_active ? "true" : "false"}
            options={[
              { label: "Yes", value: "true" },
              { label: "No", value: "false" },
            ]}
            onChange={(e) => handleChange("is_active", e.target.value === "true")}
          />
        ) : value ? (
          "Yes"
        ) : (
          "No"
        ),
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
      render: (_, agency) =>
        agency.id === editRowId ? (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => saveEdit(agency)}
              className="text-green-600 hover:underline text-sm"
            >
              Simpan
            </button>
            <button
              onClick={cancelEdit}
              className="text-gray-500 hover:underline text-sm"
            >
              Batal
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-2">
            <button
              onClick={() => startEdit(agency)}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete?.(agency.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </div>
        ),
    },
  ];

  return <Table data={agencies} columns={columns} />;
};

export default TableGovernmentAgency;
