import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import listEndpoints from "express-list-endpoints";
import mongoose from "mongoose";

import authenticate from "./middlewares/auth.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

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
  res.send("Hello Technigo!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
