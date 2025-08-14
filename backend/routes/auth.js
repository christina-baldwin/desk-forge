import dotenv from "dotenv";
dotenv.config();

import express from "express";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const saltRounds = 10;
  const hashed = await bcrypt.hash(password, saltRounds);
  return hashed;
}

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

    user.previousLogin = user.lastLogin;
    user.lastLogin = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in",
      token,
      lastLogin: user.lastLogin,
      previousLogin: user.previousLogin,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: error.message || "Login error", error });
  }
});

// user info
router.get("/user", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name email lastLogin previousLogin"
    );

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

router.patch("/user", authenticate, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findById(req.user.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (password) {
      user.password = await hashPassword(password);
    }

    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

export default router;
