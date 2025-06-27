import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// signing up as a user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is missing or empty!");
    }

    const token = jwt.sign(
      { id: newUser._id, user: newUser.email },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({ success: true, message: "User created", token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Error creating user", error });
  }
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, user: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ success: true, message: "Logged in", token });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || "Login error", error });
  }
});

// user info
router.get("/user", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("name email");
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

export default router;
