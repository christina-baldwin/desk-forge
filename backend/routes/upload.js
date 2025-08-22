import express from "express";
import Desk from "../models/Desk.js";
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
    const problems = req.body.problems;

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

    // Save to MongoDB Desk collection
    const newDesk = new Desk({
      userId: req.user.id,
      imageUrl: result.secure_url,
      problems: problems,
      suggestions: [],
    });

    await newDesk.save();

    res.status(200).json({
      success: true,
      message: "Photo uploaded and saved to DB!",
      url: result.secure_url,
      id: result.public_id,
      desk: {
        _id: newDesk._id,
        problems: newDesk.problems,
        suggestions: newDesk.suggestions,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// GET latest desk for logged-in user
router.get("/latest", authenticate, async (req, res) => {
  try {
    // Find latest desk for the user by createdAt descending
    const latestDesk = await Desk.findOne({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .exec();

    if (!latestDesk) {
      return res.status(404).json({ success: false, message: "No desk found" });
    }

    res.status(200).json({ success: true, desk: latestDesk });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch latest desk" });
  }
});

router.get("/desks", authenticate, async (req, res) => {
  try {
    // newest desk first
    const desks = await Desk.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .exec();

    res.status(200).json({ success: true, desks });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to fetch desks" });
  }
});

router.delete("/desks/:id", authenticate, async (req, res) => {
  try {
    const deskId = req.params.id;

    // find desk by ID and check it belongs to the user
    const desk = await Desk.findOneAndDelete({
      _id: deskId,
      userId: req.user.id,
    });

    if (!desk) {
      return res
        .status(404)
        .json({ success: false, message: "Desk not found" });
    }

    // delete the image from Cloudinary
    // extract public ID from URL
    const publicId = desk.imageUrl.split("/").slice(-2).join("/").split(".")[0];

    await cloudinary.uploader.destroy(publicId);

    res
      .status(200)
      .json({ success: true, message: "Desk deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to delete desk" });
  }
});

router.patch("/desks/:id", authenticate, async (req, res) => {
  try {
    const { problems } = req.body;
    const deskId = req.params.id;

    // find desk by ID and check it belongs to the user
    const desk = await Desk.findOne({
      _id: deskId,
      userId: req.user.id,
    });

    if (!desk) {
      return res
        .status(404)
        .json({ success: false, message: "Desk not found" });
    }

    if (problems !== undefined) {
      desk.problems = problems;
    }

    await desk.save();

    res
      .status(200)
      .json({ success: true, message: "Desk updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to update desk" });
  }
});

export default router;
