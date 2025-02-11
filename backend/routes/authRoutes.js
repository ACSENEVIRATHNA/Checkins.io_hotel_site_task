const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const {
  createUser,
  loginUser,
  createBooking,
  deleteAllBookings,
  getUserBookings,
  deleteSingleBooking,
  updateBooking,
  getUser,
  logoutUser
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/create-booking", authMiddleware, createBooking);
router.delete("/delete-all-bookings", authMiddleware, deleteAllBookings);
router.get("/get-bookings", authMiddleware, getUserBookings);
router.delete("/delete-booking/:id", authMiddleware, deleteSingleBooking);
router.put("/update-booking", authMiddleware, updateBooking);
router.put("/update-booking", authMiddleware, updateBooking);
router.get("/get-user", authMiddleware, getUser);
router.post("/logout", logoutUser);

module.exports = router;
