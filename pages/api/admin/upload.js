import fs from "fs";
import path from "path";
import formidable from "formidable";
import { requireAdmin } from "../../../lib/requireAdmin";

export const config = {
  api: {
    bodyParser: false,
  },
};

function parseForm(req, uploadDir) {
  const form = formidable({
    uploadDir,
    keepExtensions: true,
    maxFileSize: 5 * 1024 * 1024,
    filter: ({ mimetype }) => Boolean(mimetype?.startsWith("image/")),
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) reject(error);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const admin = await requireAdmin(req);

  if (!admin.ok) {
    return res.status(admin.status).json({
      success: false,
      message: admin.message,
    });
  }

  try {
    const uploadDir = path.join(process.cwd(), "public", "uploads");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const { files } = await parseForm(req, uploadDir);
    const uploadedFile = Array.isArray(files.image) ? files.image[0] : files.image;

    if (!uploadedFile) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }

    const originalName = uploadedFile.originalFilename || "image";
    const ext = path.extname(originalName) || path.extname(uploadedFile.filepath);
    const safeName = path
      .basename(originalName, ext)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    const filename = `${Date.now()}-${safeName || "image"}${ext}`;
    const finalPath = path.join(uploadDir, filename);

    fs.renameSync(uploadedFile.filepath, finalPath);

    return res.status(200).json({
      success: true,
      imagePath: `/uploads/${filename}`,
    });
  } catch (error) {
    console.error("Admin Upload Error:", error);
    return res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
}
