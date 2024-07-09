const asyncHandler = require("asyncHandler");
const User = require("../models/userModel");
const { generateToken } = require("../utils/jwtToken");

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
    });
  }else{
    res.status(401);
    throw new Error("Invalid Credentials!")
  }
});

module.exports = {createUser , loginUser}
