const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Booking = require("../models/bookingModel");
const { generateToken } = require("../utils/jwtToken");
const validateMongoDbId = require("../utils/validateMongoDbId");

const createUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userExists = await User.findOne({ email: email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  } else {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user && (await user.isPasswordMatched(password))) {
    const token = generateToken(user._id);
    res.cookie("Checkins_Token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      _id: user?._id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      token: generateToken(user?._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials!");
  }
});

const createBooking = asyncHandler(async (req, res) => {
  const { checkinDate, checkoutDate, price, hotelId } = req.body;
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    let newBooking = await new Booking({
      userId: _id,
      checkinDate,
      checkoutDate,
      price,
      hotelId,
    }).save();
    res.json(newBooking);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllBookings = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    validateMongoDbId(_id);
    try {
      const user = await User.findOne({ _id });
      const bookings = await Booking.findOneAndDelete({ userId: user._id });
      res.json(bookings);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = { createUser, loginUser, createBooking ,deleteAllBookings};
