const express = require("express");

const {
  createSupplier,
  deleteSupplier,
  updateSupplier,
  getAllSuppliers,
  supplierProductDetails,
} = require("../controllers/suppliercontroller");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", protect, createSupplier);
router.get("/suppliers", protect, getAllSuppliers);
router.put("/update/:id", protect, updateSupplier);
router.delete("/delete/:id", protect, deleteSupplier);
router.get("/supplierProductDetails", protect, supplierProductDetails);

module.exports = router;
