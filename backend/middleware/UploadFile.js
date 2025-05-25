import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

const projectId = process.env.PROJECT_ID;
const keyFilename = process.env.KEY_FILE_NAME;
const bucketName = process.env.BUCKET_NAME;

const storage = new Storage({ projectId, keyFilename });

// Multer configuration for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow images and PDFs
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/svg+xml",
      "application/pdf",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only JPG, PNG, SVG, and PDF files are allowed."
        )
      );
    }
  },
});

// Function to upload file to Google Cloud Storage
async function uploadFileToGCS(file, folderName) {
  try {
    const bucket = storage.bucket(bucketName);
    const timestamp = Date.now();
    const fileExtension = path.extname(file.originalname);
    const fileName = `${folderName}/${timestamp}_${file.originalname}`;

    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        contentDisposition: `inline; filename="${file.originalname}"`,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on("error", (error) => {
        reject(error);
      });

      stream.on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
        resolve(publicUrl);
      });

      stream.end(file.buffer);
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Middleware to handle multiple file uploads
const uploadFiles = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "lampiran", maxCount: 1 },
]);

export { uploadFiles, uploadFileToGCS };
