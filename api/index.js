import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import listingRouter from "./routes/listing.route.js";
import cookieParser from 'cookie-parser'
import { fileURLToPath } from "url";
import multer from "multer";
import path from "path";
import cors from "cors";


//here we are configuring the dotenv package and connecting to the database
dotenv.config();
mongoose.connect(process.env.MONGO).then(() => {
  console.log("connected to database");
}).catch((err) => {
  console.log(err);
});


//here we have created the server
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

//this will allow json as the input to the server

const __dirname1 = path.resolve();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/uploads1', express.static(path.join(__dirname, '../uploads1')));


// Multer setup for single file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// File upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  const fileUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ success: true, fileUrl });
});




//multer setup for  multiple file
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads1/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
})

const upload1 = multer({ storage: storage1 });

app.post('/uploadfiles', upload1.array('files', 6), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "No files uploaded" });
  }

  // Generate URLs for all uploaded files
  const fileUrls = req.files.map(file => `http://localhost:3000/uploads1/${file.filename}`);
  
  res.json({ success: true, fileUrls });
});
 


app.listen(3000, () => {
  console.log("server is running on port 3000 ");
});


app.use('/api/user', userRouter);
app.use("/api/auth", authRouter);
app.use('/api/listing', listingRouter);

app.use(express.static(path.join(__dirname1, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname1, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})
