const express = require("express");

const {
  noOfOrders,
  noOfUsers,
  produsctsBelowRLevel,
} = require("../controllers/reportController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get("/orders", protect, noOfOrders);
router.get("/users", protect, noOfUsers);
router.get("/products", protect, produsctsBelowRLevel);

module.exports = router;
