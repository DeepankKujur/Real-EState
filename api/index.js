import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import cors from "cors";
import cloudinary from "cloudinary";
import { fileURLToPath } from "url";

// Configure dotenv and MongoDB connection
dotenv.config();
mongoose
  .connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.Cloud_Name,
  api_key: process.env.Cloud_Api,
  api_secret: process.env.Cloud_Secret,
});

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Multer setup for in-memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cloudinary single file upload endpoint
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }

  const uploadStream = cloudinary.v2.uploader.upload_stream(
    { folder: "real-estate-listings" },
    (error, result) => {
      console.log(result)
      if (error) {
        return res.status(500).json({ success: false, message: error.message });
      }
      res.json({ success: true, fileUrl: result.secure_url });
    }
  );
    
  uploadStream.end(req.file.buffer);
});

// Cloudinary multiple file upload endpoint
app.post("/uploadfiles", upload.array("files", 6), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "No files uploaded" });
  }

  try {
    const uploadPromises = req.files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const uploadStream = cloudinary.v2.uploader.upload_stream(
            { folder: "real-estate-listings" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          );
          uploadStream.end(file.buffer);
        })
    );

    const fileUrls = await Promise.all(uploadPromises);
    res.json({ success: true, fileUrls });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// API Routes
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/listing", listingRouter);

// Serve static files
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "client/dist")));

// Wildcard route for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ success: false, statusCode, message });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
