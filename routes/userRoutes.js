import express from "express";
import {
  getPendingStaff,
  updateStaffStatus,
} from "../controllers/userController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/staff/pending", protect, adminOnly, getPendingStaff);
router.put("/staff/:id/status", protect, adminOnly, updateStaffStatus);

export default router;
