// Impor kelas Storage dari paket '@google-cloud/storage'
import { Storage } from "@google-cloud/storage";

// Impor paket 'dotenv' untuk memuat variabel lingkungan dari file .env
import dotenv from "dotenv";
dotenv.config();

// Mendapatkan variabel lingkungan 'PROJECT_ID' dan 'KEYFILENAME' dari file .env
const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEY_FILE_NAME;

// Membuat objek Storage baru dengan project ID dan file kunci yang ditentukan
const storage = new Storage({ projectId, keyFilename });

// Mendefinisikan fungsi asinkron untuk mengunggah file ke Google Cloud Storage
async function uploadFile(bucketName, file, folderName, fileOutputName) {
  try {
    // Mendapatkan referensi ke bucket yang ditentukan
    const bucket = storage.bucket(bucketName);

    // Menentukan path tujuan dengan folder
    const destination = folderName
      ? `${folderName}/${fileOutputName}`
      : fileOutputName;

    // Mengunggah file yang ditentukan ke bucket dengan nama tujuan yang diberikan
    const uploadResult = await bucket.upload(file, {
      destination: destination,
      metadata: {
        contentDisposition: `inline; filename="${fileOutputName}"`,
      },
    });

    // Membuat URL publik untuk file yang diunggah
    const publicUrl = `https://storage.googleapis.com/${bucketName}/${destination}`;

    console.log(`File ${file} berhasil diunggah ke ${destination}`);
    console.log(`URL: ${publicUrl}"\n`);

    // Mengembalikan hasil operasi unggahan beserta URL publik
    return { uploadResult, publicUrl };
  } catch (error) {
    // Menangani error yang terjadi selama proses unggahan
    console.error("Error:", error);
    throw error;
  }
}

// Menggunakan Immediately-Invoked Function Expression (IIFE) untuk melakukan pengujian unggah file
(async () => {
  const bucketName = process.env.BUCKET_NAME;

  try {
    // Contoh mengunggah file ke folder files yang sudah ada
    const uploadResultFiles = await uploadFile(
      bucketName,
      "assets/files/v1bucket_upload.js",
      "files",
      "laporin_db.sql"
    );

    // Contoh mengunggah file ke folder images yang sudah ada
    const uploadResultImages = await uploadFile(
      bucketName,
      "assets/images/futabaerror.jpg", // Ganti dengan path file gambar yang ingin diunggah
      "images",
      "futabaerror.jpg" // Ganti dengan nama output file yang diinginkan
    );

    console.log("URL File:", uploadResultFiles.publicUrl);
    console.log("URL Image:", uploadResultImages.publicUrl);
  } catch (error) {
    console.error("Gagal mengunggah file:", error);
  }
})();
