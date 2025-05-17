import InputField from "../components/InputField";
import SelectField from "../components/SelectField";
import TextArea from "../components/TextArea";
import ImageUpload from "../components/ImageUpload";
import DateTimeField from "../components/DateTimeField";

const FormPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="ps-2 text-3xl font-bold text-black mb-6">ADUAN LAYANAN</h1>
      <form className="grid grid-cols-1 gap-6">
        <InputField id="title" name="title" placeholder="Judul Aduan" />

        <SelectField
          id="category"
          name="category"
          label="Pilih Kategori Aduan"
          options={["Music", "Sports", "Arts", "Technology"]}
        />

        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextArea id="description" name="description" placeholder="Deskripsi Aduan" />
          <ImageUpload useFor={"Bukti Pendukung"} />
        </div>

        <InputField id="location" name="location" placeholder="Lokasi Kejadian" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField id="nama-pelapor" name="nama-pelapor" placeholder="Nama Pelapor" />
          <InputField id="email-pelapor" name="email-pelapor" type="email" placeholder="Email Pelapor Aktif" />
        </div>

        <InputField id="alamat-pelapor" name="alamat-pelapor" placeholder="Alamat Pelapor" />

        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateTimeField id="start-date" label="Start Date" />
          <DateTimeField id="end-date" label="End Date" />
        </div>

        <div className="p-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center bg-[#f6f6f6] rounded-md p-2">
            <span className="flex-shrink-0 flex items-center mr-3 text-gray-500">
              <label htmlFor="status" className="block">Status</label>
            </span>
            <SelectField
              id="status"
              name="status"
              label="Select Status"
              options={[
                { value: "active", label: "Active" },
                { value: "inactive", label: "Inactive" },
              ]}
            />
          </div>
          <InputField id="tags" name="tags" placeholder="Tags (comma-separated)" />
        </div>

        <div className="col-span-full mt-6 p-2">
          <button type="submit" className="block w-full bg-[#8c0327] hover:bg-[#6b0220] text-white font-bold py-3 px-4 rounded-full">
            Kirim
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormPage