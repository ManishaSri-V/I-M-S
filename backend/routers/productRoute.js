const express = require("express");

const {
  deleteProductById,
  getProductById,
  updateProductById,
  getAllProducts,
  addProduct,
} = require("../controllers/productController");

const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", protect, addProduct);
router.get("/products", protect, getAllProducts);
router.get("/:id", protect, getProductById);
router.put("/update/:id", protect, updateProductById);
router.delete("/delete/:id", protect, deleteProductById);

module.exports = router;
