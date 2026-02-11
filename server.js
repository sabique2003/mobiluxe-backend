import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();

/* ============================
   ✅ CORS CONFIG (VERY IMPORTANT)
============================ */

const allowedOrigins = [
  "http://localhost:5173",
  "https://mobiluxe-frontend-zu92.vercel.app",
   "https://www.merobi.com"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ IMPORTANT: allow preflight requests
app.options("*", cors());

/* ============================
   ✅ BODY PARSER
============================ */
app.use(express.json());

/* ============================
   ✅ ROUTES
============================ */
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Mobiluxe API running");
});

/* ============================
   ✅ SERVER
============================ */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
