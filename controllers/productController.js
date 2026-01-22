import Product from "../models/product.js";

// ---------------- STAFF: ADD PRODUCT ----------------
export const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, images } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      images,
      createdBy: req.user._id,
      status: "pending",
    });

    res.status(201).json({
      message: "Product submitted for admin approval",
      product,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- STAFF: MY PRODUCTS ----------------
export const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user._id });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- ADMIN: ALL PRODUCTS ----------------
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate(
      "createdBy",
      "name email"
    );
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- ADMIN: APPROVE / REJECT ----------------
export const updateProductStatus = async (req, res) => {
  try {
    const { status } = req.body; // approved | rejected

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.status = status;
    await product.save();

    res.json({ message: `Product ${status}` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- CLIENT: APPROVED PRODUCTS ----------------
export const getApprovedProducts = async (req, res) => {
  try {
    const products = await Product.find({ status: "approved" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ---------------- STAFF: UPDATE PRODUCT ----------------
export const updateMyProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    Object.assign(product, req.body);
    product.status = "pending"; // re-approval required

    await product.save();
    res.json({ message: "Product updated, pending approval", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- STAFF: DELETE PRODUCT ----------------
export const deleteMyProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---------------- STAFF: GET SINGLE PRODUCT ----------------
export const getMyProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// CLIENT: GET SINGLE APPROVED PRODUCT
export const getApprovedProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      status: "approved",
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
