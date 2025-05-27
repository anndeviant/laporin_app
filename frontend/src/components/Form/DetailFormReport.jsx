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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    setShowDeleteModal(true);
  };

  const konfirmasiHapus = async () => {
    setLoading(true);
    setShowDeleteModal(false);
    await onDelete(dataLaporan.id);
    setLoading(false);
    back();
  };

  const batalHapus = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
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

      {/* Custom Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 15.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Konfirmasi Hapus</h3>
                <p className="text-sm text-gray-500">Tindakan ini tidak dapat dibatalkan</p>
              </div>
            </div>

            <p className="text-gray-700 mb-6">
              Apakah Anda yakin ingin menghapus laporan "<span className="font-semibold">{dataLaporan.title}</span>"?
              Data yang sudah dihapus tidak dapat dikembalikan.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={batalHapus}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={konfirmasiHapus}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {loading ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailReportForm;
