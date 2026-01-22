import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import User from "../models/user.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin
    const admin = await User.create({
      name: "Mobiluxe Admin",
      email: "admin@mobiluxe.com",
      password: hashedPassword,
      role: "admin",
      status: "approved",
    });

    console.log("Admin user created successfully:");
    console.log({
      email: admin.email,
      password: "admin123",
    });

    process.exit();
  } catch (error) {
    console.error("Admin seeding failed:", error);
    process.exit(1);
  }
};

seedAdmin();
