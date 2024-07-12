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
  const user = await User.findOne({ email: email }).populate("bookings");
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
      mobile: user?.mobile,
      bookings: user?.bookings,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Credentials!");
  }
});

const logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log(cookie);
  if (!cookie?.Checkins_Token) throw new Error("No refresh token in cookies.");
  const refreshToken = cookie.Checkins_Token;
  const user = await User.findOne({ refreshToken });
  if (!user) {
    res.clearCookie("Checkins_Token", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }
  await User.findOneAndUpdate(
    { refreshToken },
    {
      refreshToken: "",
    }
  );
  res.clearCookie("Checkins_Token", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

const getUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    const user = await User.findById(_id).populate("bookings");

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.json({
      _id: user._id,
      userName: user.userName,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile: user.mobile,
      bookings: user.bookings,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const createBooking = asyncHandler(async (req, res) => {
  const { checkinDate, checkoutDate, price, hotelId ,hotelName , roomName , totalPrice} = req.body;
  const { _id } = req.user;

  validateMongoDbId(_id);

  try {
    let newBooking = await new Booking({
      userId: _id,
      checkinDate,
      checkoutDate,
      price,
      hotelId,
      hotelName,
      roomName,
      totalPrice
    }).save();
    await User.findByIdAndUpdate(_id, { $push: { bookings: newBooking._id } });
    res.json(newBooking);
  } catch (error) {
    throw new Error(error);
  }
});

const getUserBookings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const bookings = await Booking.find({ userId: _id }).populate("userId");
    res.json(bookings);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteAllBookings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const user = await User.findOne({ _id });
    const bookings = await Booking.deleteMany({ userId: user._id });
    await User.findByIdAndUpdate(_id, { $set: { bookings: [] } });
    res.json({ message: "All Bookings deleted successfully!", bookings });
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSingleBooking = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  validateMongoDbId(_id);
  try {
    const deletedBooking = await Booking.deleteOne({
      userId: _id,
      _id: id,
    });
    if (!deletedBooking) {
      res.status(404);
      throw new Error(
        "Booking not found or you are not authorized to delete this booking"
      );
    }
    await User.findByIdAndUpdate(_id, { $pull: { bookings: id } });
    res.json({ message: "Booking deleted successfully!", deletedBooking });
  } catch (error) {
    throw new Error(error);
  }
});

const updateBooking = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bookingId } = req.body;
  const { checkinDate, checkoutDate, price, hotelId ,hotelName , roomName ,totalPrice} = req.body;

  validateMongoDbId(_id);
  validateMongoDbId(bookingId);

  try {
    const booking = await Booking.findOne({ _id: bookingId, userId: _id });

    if (!booking) {
      res.status(404);
      throw new Error(
        "Booking not found or you are not authorized to update this booking"
      );
    }

    booking.checkinDate = checkinDate || booking.checkinDate;
    booking.checkoutDate = checkoutDate || booking.checkoutDate;
    booking.price = price || booking.price;
    booking.hotelId = hotelId || booking.hotelId;
    booking.hotelName = hotelName || booking.hotelName;
    booking.roomName = roomName || booking.roomName;
    booking.totalPrice = totalPrice || booking.totalPrice;

    const updatedBooking = await booking.save();
    res.json({ message: "Booking updated successfully!", updatedBooking });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createUser,
  loginUser,
  createBooking,
  deleteAllBookings,
  getUserBookings,
  deleteSingleBooking,
  updateBooking,
  getUser,
  logoutUser
};
