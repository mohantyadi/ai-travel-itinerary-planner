import dotenv from "dotenv";
dotenv.config();

// Log environment variables
console.log("🔑 GEMINI_API_KEY from env:", process.env.GEMINI_API_KEY ? "loaded ✅" : "❌ missing");
console.log("🔑 MONGO_URI from env:", process.env.MONGO_URI);

import express from "express";
import mongoose from "mongoose";
import itineraryRoutes from "./routes/itineraryRoutes.js";

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

app.use("/api/trips", itineraryRoutes);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
