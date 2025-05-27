import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ImageUpload from "../components/Form/ImageUpload";
import InputField from "../components/Form/InputField";
import SelectField from "../components/Form/SelectField";
import TextArea from "../components/Form/TextArea";
// import bgImage from "../assets/svg/Clippathgroup.svg";
import { BASE_URL } from "../utils";
import logo from "../assets/images/laporinlogo.png"; // Ganti dengan path logo yang sesuai

const FormPage = () => {
  const navigate = useNavigate();
  const [activeNavItem, setActiveNavItem] = useState('lapor');
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
        console.error("Gagal memuat data:");
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
      console.error("Gagal mengirim aduan:");
      if (error.response) {
        alert(`Gagal: ${"Terjadi kesalahan di server."}`);
      } else {
        alert("Tidak dapat terhubung ke server.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBerandaClick = () => {
    setActiveNavItem('beranda');
    navigate('/');
  };

  const handleBantuanClick = () => {
    setActiveNavItem('bantuan');
    navigate('/bantuan');
  };

  const handleTrackingClick = () => {
    setActiveNavItem('tracking');
    navigate('/tracking');
  };

  return (
    <div>
      {/* Modern Navbar */}
      <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Lapor.In Logo"
                width={30}
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent">
                Lapor.In
              </span>
            </div>

            {/* Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={handleBerandaClick}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'beranda'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                Beranda
              </button>
              <button
                onClick={() => setActiveNavItem('lapor')}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'lapor'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                Lapor
              </button>
              <button
                onClick={handleTrackingClick}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'tracking'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                Lacak Laporan
              </button>
              <button
                onClick={handleBantuanClick}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeNavItem === 'bantuan'
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
              >
                Bantuan
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content with top padding for fixed navbar */}
      <div
        className="bg-contain bg-no-repeat min-h-screen flex flex-col items-center justify-start py-10 px-4 pt-24"
        style={{
          backgroundColor: "#E0F0FD",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8 px-6 py-6">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl lg:text-4xl font-bold text-black tracking-wide">
              LAYANAN ADUAN INFRASTRUKTUR ONLINE
            </h2>
          </div>
          <p className="text-lg lg:text-xl text-gray-700 max-w-4xl mx-auto">
            Sampaikan aduan Anda terkait fasilitas umum di lingkungan Anda secara cepat dan mudah.
          </p>
        </div>

        {/* Form */}
        <div className="container max-w-4xl bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-sky-500 mb-8 text-center">FORMULIR PENGADUAN</h1>
          <form className="grid grid-cols-1 gap-10" onSubmit={handleSubmit}>

            {/* Section 1: Informasi Aduan */}
            <div className="bg-gray-50 p-8 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold mr-3">1</span>
                Informasi Aduan
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <InputField
                  id="title"
                  name="title"
                  placeholder="Judul Aduan"
                  value={formData.title}
                  required
                  onChange={handleChange}
                  sub="Judul Aduan"
                />

                <SelectField
                  id="category_id"
                  name="category_id"
                  label="Pilih Kategori Aduan"
                  options={[
                    ...categories.map((cat) => ({
                      value: cat.id,
                      label: cat.name,
                    }))
                  ]}
                  required
                  onChange={handleChange}
                  value={formData.category_id}
                  sub="Kategori Aduan"
                />

                <TextArea
                  id="description"
                  name="description"
                  placeholder="Deskripsikan aduan Anda secara detail..."
                  value={formData.description}
                  required
                  onChange={handleChange}
                  sub="Deskripsi Aduan"
                />

                <InputField
                  id="location"
                  name="location"
                  placeholder="Contoh: Jl. Sudirman No. 123, Jakarta Pusat"
                  value={formData.location}
                  required
                  onChange={handleChange}
                  sub="Lokasi Kejadian"
                />

                <SelectField
                  id="agency_id"
                  name="agency_id"
                  label="Pilih Instansi Tujuan"
                  options={[
                    ...agencies.map((agency) => ({
                      value: agency.id,
                      label: agency.name,
                    }))
                  ]}
                  required
                  onChange={handleChange}
                  value={formData.agency_id}
                  sub="Lapor Ke Instansi"
                />
              </div>
            </div>

            {/* Section 2: Informasi Pelapor */}
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-green-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                Informasi Pelapor
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField
                  id="reporter_name"
                  name="reporter_name"
                  placeholder="Nama lengkap pelapor"
                  value={formData.reporter_name}
                  required
                  onChange={handleChange}
                  sub="Nama Pelapor"
                />
                <InputField
                  id="reporter_contact"
                  name="reporter_contact"
                  placeholder="No. HP/Email yang dapat dihubungi"
                  value={formData.reporter_contact}
                  required
                  onChange={handleChange}
                  sub="Kontak Pelapor"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2">
                <span className="font-medium">Catatan:</span> Informasi kontak akan digunakan untuk memberikan update status aduan Anda.
              </p>
            </div>

            {/* Section 3: Bukti Pendukung */}
            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                Bukti Pendukung
              </h2>

              {/* Upload Gambar */}
              <div className="mb-6">
                <label className="block font-semibold text-sm text-gray-700 mb-2">
                  Foto/Gambar Pendukung <span className="text-red-500">*</span>
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Unggah foto yang menunjukkan kondisi atau masalah yang dilaporkan. Format: JPG, PNG, maksimal 10MB.
                </p>
                {!imageFile ? (
                  <ImageUpload
                    useFor="Upload Gambar"
                    png={true}
                    id="image-upload"
                    name="image"
                    onChange={handleImageChange}
                  />
                ) : (
                  <div className="relative inline-block">
                    <div className="w-40 h-40 mt-2">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg border-2 border-gray-300 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg transition-colors"
                        title="Hapus gambar"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Klik ✕ untuk mengganti gambar</p>
                  </div>
                )}
              </div>

              {/* Upload PDF */}
              <div>
                <label className="block font-semibold text-sm text-gray-700 mb-2">
                  Dokumen Pendukung <span className="text-gray-500">(Opsional)</span>
                </label>
                <p className="text-sm text-gray-600 mb-3">
                  Unggah dokumen pendukung seperti surat, laporan, atau dokumen lainnya. Format: PDF, maksimal 10MB.
                </p>
                {!lampiranFile ? (
                  <ImageUpload
                    useFor="Upload PDF"
                    png={false}
                    id="pdf-upload"
                    name="lampiran"
                    onChange={handleLampiranChange}
                  />
                ) : (
                  <div className="relative inline-block">
                    <div className="mt-2 bg-white p-4 rounded-lg border-2 border-gray-300 shadow-sm max-w-xs">
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-100 p-2 rounded">
                          <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{lampiranFile.name}</p>
                          <p className="text-xs text-gray-500">PDF Document</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setLampiranFile(null)}
                        className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center shadow-lg transition-colors"
                        title="Hapus dokumen"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Klik ✕ untuk mengganti dokumen</p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-6 rounded-lg border border-blue-200">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Kirim Aduan</h3>
                <p className="text-sm text-gray-600">
                  Pastikan semua informasi yang Anda masukkan sudah benar sebelum mengirim aduan.
                </p>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full ${loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 transform hover:scale-[1.02]"
                  } text-white font-bold py-4 px-6 rounded-full transition-all duration-300 shadow-lg`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Mengirim Aduan...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Kirim Aduan</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
