import express from "express";
import {
  addProduct,
  getMyProducts,
  getAllProducts,
  updateProductStatus,
  getApprovedProducts,
  updateMyProduct,
  deleteMyProduct,
  getMyProductById,
  getApprovedProductById
} from "../controllers/productController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// CLIENT
router.get("/approved", getApprovedProducts);
router.get("/approved/:id", getApprovedProductById);

/* STAFF */
router.post("/", protect, addProduct);
router.get("/my", protect, getMyProducts); // ✅ FIX (THIS LINE)
router.get("/:id", protect, getMyProductById); 
router.put("/my/:id", protect, updateMyProduct);
router.delete("/my/:id", protect, deleteMyProduct);


/* ADMIN */
router.get("/", protect, adminOnly, getAllProducts);
router.put("/:id/status", protect, adminOnly, updateProductStatus);



export default router;
