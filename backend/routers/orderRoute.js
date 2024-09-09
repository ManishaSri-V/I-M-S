const express = require("express");

const {
  addOrder,
  getAllOrders,
  updateOrderById,
  getOrderById,
  deleteOrderById,
  changeStatus,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.post("/add", protect, addOrder);
router.put("/update/:id", protect, updateOrderById);
router.get("/orders", protect, getAllOrders);
router.get("/order", protect, getOrderById);
router.delete("/delete/:id", protect, deleteOrderById);
router.put("/setCompleted", protect, changeStatus("Completed"));
router.put("/setCancel", protect, changeStatus("Cancelled"));

module.exports = router;
