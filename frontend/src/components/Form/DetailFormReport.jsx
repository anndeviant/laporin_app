import { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextArea from "./TextArea";

const statusOptions = [
  { value: "pending", label: "Pending" },
  { value: "verified", label: "Verified" },
  { value: "in_progress", label: "Sedang Diproses" },
  { value: "resolved", label: "Selesai" },
  { value: "rejected", label: "Ditolak" },
];

const DetailReportForm = ({ report, onUpdate, onDelete, back }) => {
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


  const kirimPerubahan = async (data) => {
    const updatedData = {
      ...dataLaporan,
      ...data,
      updatedAt: new Date().toISOString(),
    };

    if (onUpdate) onUpdate(updatedData); 
    setBisaEdit(false);
  };

  const tanganiLaporan = async () => {
    const data = {
      status: "in_progress",
    };
    await kirimPerubahan(data);
    back();
  };

  const simpanPerubahan = async () => {
    await kirimPerubahan(dataLaporan);
    back();
  };

  const hapusLaporan = async () => {
    const yakin = window.confirm("Yakin mau hapus laporan ini?");
    if (!yakin) return;

    setLoading(true);
    await onDelete(dataLaporan.id);
    setLoading(false);
    back()
  };

  return (
    <form className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Detail Laporan</h2>
      <InputField readOnly name="title" value={dataLaporan.title} placeholder="Judul Laporan" sub={"Title"} disabled />
      <InputField readOnly name="category" value={dataLaporan.report_category?.name || "–"} placeholder="Kategori" sub={"Kategori"} disabled />
      <TextArea readOnly name="description" value={dataLaporan.description} placeholder="Deskripsi" sub={"Deskripsi"} disabled />
      <InputField readOnly name="reporter_name" value={dataLaporan.reporter_name} placeholder="Nama Pelapor" sub={"Nama Pelapor"} disabled />
      <InputField readOnly name="reporter_contact" value={dataLaporan.reporter_contact} placeholder="Kontak Pelapor" sub={"Kontak Nama Pelapor"} disabled />
      <InputField readOnly name="location" value={dataLaporan.location} placeholder="Lokasi" sub={"Lokasi"} disabled />
      <InputField readOnly name="agency" value={dataLaporan.government_agency?.name || "–"} placeholder="Teruntuk" sub={"Teruntuk"} disabled />
      <InputField readOnly name="image_url" value={dataLaporan.image_url} placeholder="URL Gambar" sub={"Link Gambar"} />
      <img
        src={dataLaporan.image_url}
        alt="Preview"
        className="w-full h-full object-cover rounded border"
        style={{ cursor: 'pointer' }}
        onClick={() => window.open(dataLaporan.image_url, '_blank')}
      />
      <InputField readOnly name="lampiran_url" value={dataLaporan.lampiran_url || "-"} placeholder="Lampiran" sub={"Link Lampiran"} disabled />

      <SelectField
        sub={"Status Laporan"}
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
