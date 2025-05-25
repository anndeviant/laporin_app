import { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextArea from "./TextArea";
import { BASE_URL } from "../../utils";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "in_progress", label: "Sedang Diproses" },
  { value: "resolved", label: "Selesai" },
  { value: "rejected", label: "Ditolak" },
];

const DetailReportForm = ({ report, onUpdate, onDelete }) => {
  const [dataLaporan, setDataLaporan] = useState({ ...report });
  const [bisaEdit, setBisaEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const gantiIsi = (e) => {
    const { name, value } = e.target;
    if (bisaEdit || name === "status") {
      setDataLaporan((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const kirimPerubahan = async (data, method = "patch") => {
    setLoading(true);
    try {
      const res = await axios[method](
        `${BASE_URL}/admin/reports/${dataLaporan.id}`,
        data
      );
      const dataBaru = res.data;

      setDataLaporan(dataBaru);
      if (onUpdate) onUpdate(dataBaru);
      setBisaEdit(false);
    } catch (err) {
      console.error(err);
      alert("Gagal update laporan.");
    } finally {
      setLoading(false);
    }
  };

  const tanganiLaporan = () => {
    const data = {
      admin_id: 1,
      status: "in_progress",
    };
    kirimPerubahan(data);
  };

  const simpanPerubahan = () => {
    kirimPerubahan(dataLaporan);
  };

  const hapusLaporan = async () => {
    const yakin = window.confirm("Yakin mau hapus laporan ini?");
    if (!yakin) return;

    setLoading(true);
    try {
      await axios.delete(`${BASE_URL}/admin/reports/${dataLaporan.id}`);
      alert("Laporan berhasil dihapus.");
      if (onDelete) onDelete(dataLaporan.id);
    } catch (err) {
      console.error(err);
      alert("Gagal hapus laporan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>

      <InputField name="title" value={dataLaporan.title} placeholder="Judul Laporan" disabled />
      <TextArea name="description" value={dataLaporan.description} placeholder="Deskripsi" disabled />
      <InputField name="reporter_name" value={dataLaporan.reporter_name} placeholder="Nama Pelapor" disabled />
      <InputField name="reporter_contact" value={dataLaporan.reporter_contact} placeholder="Kontak Pelapor" disabled />
      <InputField name="location" value={dataLaporan.location} placeholder="Lokasi" disabled />
      <InputField name="image_url" value={dataLaporan.image_url} placeholder="URL Gambar" disabled />
      <InputField name="lampiran_url" value={dataLaporan.lampiran_url || "-"} placeholder="Lampiran" disabled />

      <SelectField
        name="status"
        label=""
        options={statusOptions}
        value={dataLaporan.status}
        onChange={gantiIsi}
        disabled={!bisaEdit}
      />

      <div className="mt-6 flex gap-4">
        {report.status === "pending" ? (
          <button
            type="button"
            onClick={tanganiLaporan}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            Tangani Laporan
          </button>
        ) : (
          <>
            {!bisaEdit ? (
              <button
                type="button"
                onClick={() => setBisaEdit(true)}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                Edit Status
              </button>
            ) : (
              <button
                type="button"
                onClick={simpanPerubahan}
                disabled={loading}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
              >
                Simpan
              </button>
            )}
            <button
              type="button"
              onClick={hapusLaporan}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
            >
              Hapus
            </button>
          </>
        )}
      </div>
    </form>
  );
};

export default DetailReportForm;
