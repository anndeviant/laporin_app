import { useEffect, useState } from "react";
import axios from "axios";
import ImageUpload from "../components/Form/ImageUpload";
import InputField from "../components/Form/InputField";
import SelectField from "../components/Form/SelectField";
import TextArea from "../components/Form/TextArea";
import bgImage from "../assets/svg/Clippathgroup.svg";
import { BASE_URL } from "../utils";
import { Megaphone } from "lucide-react";

const FormPage = () => {
  const [agencies, setAgencies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [lampiranFile, setLampiranFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category_id: "1",
    description: "",
    location: "",
    reporter_name: "",
    reporter_contact: "",
    agency_id: "1",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [agencyRes, categoryRes] = await Promise.all([
          axios.get(`${BASE_URL}/public/agencies`),
          axios.get(`${BASE_URL}/public/categories`),
        ]);
        setAgencies(agencyRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleLampiranChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setLampiranFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Mohon unggah gambar sebagai bukti pendukung.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });

    data.append("image", imageFile);
    if (lampiranFile) data.append("lampiran", lampiranFile);

    setLoading(true);
    try {
      await axios.post(`${BASE_URL}/public/reports`, data);
      alert("Aduan berhasil dikirim!");
      // Reset form jika perlu
      setFormData({
        title: "",
        category_id: "1",
        description: "",
        location: "",
        reporter_name: "",
        reporter_contact: "",
        agency_id: "1",
      });
      setImageFile(null);
      setImagePreview(null);
      setLampiranFile(null);
    } catch (error) {
      console.error("Gagal mengirim aduan:", error);
      if (error.response) {
        alert(`Gagal: ${error.response.data.msg || "Terjadi kesalahan di server."}`);
      } else {
        alert("Tidak dapat terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="bg-contain bg-no-repeat min-h-screen flex flex-col items-center justify-start py-10 px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundColor: "#E0F0FD",
      }}
    >
      {/* Header */}
      <div className="text-center mb-6 bg-white bg-opacity-80 rounded-xl px-6 py-4 shadow">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Megaphone className="text-sky-500" size={32} />
          <h2 className="text-2xl font-bold text-sky-500 tracking-wide">
            FORM PENGADUAN FASILITAS MASYARAKAT
          </h2>
        </div>
        <p className="text-md text-gray-700">
          Sampaikan aduan Anda terkait fasilitas umum di lingkungan Anda secara cepat dan mudah.
        </p>
      </div>

      {/* Form */}
      <div className="container max-w-3xl bg-white bg-opacity-90 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-black mb-6">ADUAN LAYANAN</h1>
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <InputField
            id="title"
            name="title"
            placeholder="Judul Aduan"
            value={formData.title}
            required
            onChange={handleChange}
          />

          <SelectField
            id="category_id"
            name="category_id"
            label="Pilih Kategori Aduan"
            options={categories.map((cat) => ({
              value: cat.id,
              label: cat.name,
            }))}
            required
            onChange={handleChange}
            value={formData.category_id}
          />

          <TextArea
            id="description"
            name="description"
            placeholder="Deskripsi Aduan"
            value={formData.description}
            required
            onChange={handleChange}
          />

          <InputField
            id="location"
            name="location"
            placeholder="Lokasi Kejadian"
            value={formData.location}
            required
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              id="reporter_name"
              name="reporter_name"
              placeholder="Nama Pelapor"
              value={formData.reporter_name}
              required
              onChange={handleChange}
            />
            <InputField
              id="reporter_contact"
              name="reporter_contact"
              placeholder="Kontak Pelapor Aktif"
              value={formData.reporter_contact}
              required
              onChange={handleChange}
            />
          </div>

          <SelectField
            id="agency_id "
            name="agency_id"
            label="Lapor Ke Pemerintah?"
            options={agencies.map((agency) => ({
              value: agency.id,
              label: agency.name,
            }))}
            required
            onChange={handleChange}
            value={formData.agency_id}
          />

          {/* Upload Gambar */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Bukti Pendukung (Gambar)*
            </label>
            {!imageFile ? (
              <ImageUpload useFor="Upload Gambar" png={true} id="image-upload" name="image" onChange={handleImageChange} />
            ) : (
              <div className="relative w-32 h-32 mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded border"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Upload PDF */}
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Bukti Pendukung (PDF) - Optional
            </label>
            {!lampiranFile ? (
              <ImageUpload useFor="Upload PDF" png={false} id="pdf-upload" name="lampiran" onChange={handleLampiranChange} />
            ) : (
              <div className="relative mt-2 bg-gray-100 p-3 rounded border">
                <p className="text-sm text-gray-600">File: {lampiranFile.name}</p>
                <button
                  type="button"
                  onClick={() => setLampiranFile(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          <div className="mt-6">
            <button
              type="submit"
              disabled={loading}
              className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#38A8F4] hover:bg-sky-600"
                } text-white font-bold py-3 px-4 rounded-full transition duration-300`}
            >
              {loading ? "Mengirim..." : "Kirim"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
