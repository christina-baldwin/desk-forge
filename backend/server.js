import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import authenticate from "./middlewares/auth.js";
import authRoutes from "./routes/auth.js";
import userInfoRoute from "./routes/userInfo.js";

const port = process.env.PORT || 8080;
const app = express();

// MONGODB CONNECTION //
const mongoUrl = process.env.MONGO_URL;
mongoose.connect(mongoUrl);
mongoose.Promise = Promise;

// MIDDLEWARES //
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello DeskForge!");
});

app.use("/auth", authRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
