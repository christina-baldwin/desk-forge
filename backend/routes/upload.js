import express from "express";
import multer from "multer";
import authenticate from "../middlewares/auth.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config(process.env.CLOUDINARY_URL);

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/", authenticate, upload.single("image"), async (req, res) => {
  try {
    //create temporary file
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "warhammer-desk-spaces",
    });

    // delete temporary file
    await fs.unlink(file.path);

    res.status(200).json({
      success: true,
      message: "Photo uploaded!",
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

export default router;
