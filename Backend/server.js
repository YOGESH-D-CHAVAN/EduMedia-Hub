import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";

// Models & Routes
import Room from "./models/room.js";
import userRoutes from "./routes/User.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import BlogRoute from "./routes/Blog.routes.js";
import qnaRoutes from "./routes/qnaRoutes.js";
import userProfile from "./routes/userProfile.routes.js";
import { socketController } from "./controllers/socket.controller.js";

dotenv.config();
const app = express();

/* ---------------- DATABASE ---------------- */
connectDB();

/* ---------------- CORS SETUP ---------------- */
// IMPORTANT: Ensure these URLs do NOT have trailing slashes
const allowedOrigins = [
  "http://localhost:5173",
  "https://edumedia-hub-2.onrender.com",
  "https://edumedia-hub-1-bgw0.onrender.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Explicitly handle OPTIONS (Preflight) requests for all routes
app.options("*", cors());

/* ---------------- MIDDLEWARE ---------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------------- LOGGING ---------------- */
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

/* ---------------- API ROUTES ---------------- */
app.use("/api/v1/users", userRoutes);
app.use("/api/v1", uploadRoutes);
app.use("/api/v1", BlogRoute);
app.use("/api/qna", qnaRoutes);
app.use("/api/v1/user", userProfile);

/* ---------------- ROOMS ---------------- */
app.get("/api/v1/rooms", async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: -1 });
    res.status(200).json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms" });
  }
});

app.post("/api/v1/rooms", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Room name is required" });
    const roomId = name.toLowerCase().replace(/\s+/g, "-");
    const newRoom = new Room({ id: roomId, name });
    await newRoom.save();
    res.status(201).json(newRoom);
  } catch (error) {
    res.status(500).json({ message: "Error creating room" });
  }
});

app.get("/", (req, res) => res.send("🚀 EduMedia Hub API is running"));

/* ---------------- HTTP & SOCKETS ---------------- */
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins, // Socket.io handles the origin array automatically
    methods: ["GET", "POST"],
    credentials: true
  },
});

socketController(io);

/* ---------------- ERROR HANDLER ---------------- */
app.use((err, req, res, next) => {
  console.error("Global Error:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server + Socket.IO running on port ${PORT}`);
});