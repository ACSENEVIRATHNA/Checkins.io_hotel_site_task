const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createUser,
  loginUser,
  createBooking,
  deleteAllBookings
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/create-booking", authMiddleware, createBooking);
router.delete("/delete-all-bookings", authMiddleware , deleteAllBookings)

module.exports = router;
