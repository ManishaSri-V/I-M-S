const express = require("express");

const {
  getAllUsers,
  updateUserById,
  getAll,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.get("/users", protect, getAllUsers);
router.get("/:id", protect, getUserById);
router.put("/update/:id", protect, updateUserById);
router.delete("/delete/:id", protect, deleteUserById);
router.get("/role", protect, getAll);

module.exports = router;
