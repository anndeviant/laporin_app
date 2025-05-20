import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TextArea from "../components/TextArea";
import ImageUpload from "../components/ImageUpload";
import bgImage from '../assets/svg/Clippathgroup.svg';
import { Megaphone } from "lucide-react";

const FormPage = () => {
  return (
    <div
      className="bg-contain bg-no-repeat min-h-screen flex flex-col items-center justify-start py-10 px-4"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundColor: "#E0F0FD",
      }}
    >
      {/* Hiasan dan judul */}
      <div className="text-center mb-6 bg-white bg-opacity-80 rounded-xl px-6 py-4 shadow">
        <div className="flex items-center justify-center gap-3 mb-2">
          <Megaphone className="text-sky-500" size={32} />
          <h2 className="text-2xl font-bold text-sky-500 tracking-wide">FORM PENGADUAN FASILITAS MASYARAKAT</h2>
        </div>
        <p className="text-md text-gray-700">
          Sampaikan aduan Anda terkait fasilitas umum di lingkungan Anda secara cepat dan mudah.
        </p>
      </div>

      {/* Form */}
      <div className="container max-w-3xl bg-white bg-opacity-90 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-black mb-6">ADUAN LAYANAN</h1>

        <form className="grid grid-cols-1 gap-6">
          <InputField id="title" name="title" placeholder="Judul Aduan" />

          <SelectField
            id="category"
            name="category"
            label="Pilih Kategori Aduan"
            options={["Jalan Rusak", "Lampu Mati", "Saluran Tersumbat", "Lainnya"]}
          />

          <TextArea id="description" name="description" placeholder="Deskripsi Aduan" />


          <InputField id="location" name="location" placeholder="Lokasi Kejadian" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField id="nama-pelapor" name="nama-pelapor" placeholder="Nama Pelapor" />
            <InputField id="kontak-pelapor" name="kontak-pelapor" type="text" placeholder="Contact Pelapor Aktif" />
          </div>

          <SelectField
            id="laporke"
            name="laporke"
            label="Lapor Ke Pemerintah?"
            options={["Pemerintah Desa", "Pemerintah Kabupaten", "Pemerintah Provinsi", "Lainnya"]}
          />

          <ImageUpload useFor="Bukti Pendukung" />

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-[#38A8F4] hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-full transition duration-300"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormPage;
