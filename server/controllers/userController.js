const user = require("../models/userSchema");
const asyncHandler = require("../middleware/asyncHandler");
const bcrypt = require("bcryptjs");
const createToken = require("../utils/createToken");
const { parse } = require("dotenv");

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    res.status(400).json("please fill all inputs");
  }
  const existingUser = await user.findOne({ email });
  if (existingUser) {
    res.status(400).send("user with email already exists");
    throw new Error("user with email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = await user.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  createToken(res, newUser);
  if (!newUser) {
    res.status(400).json(`unable to create user ${newUser}`);
  }

  res.status(201).json({
    success: true,
    message: "user created succesfully",
    data: {
      username: newUser.username,
      email: newUser.email,
    },
  });
});

// login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json("please fill all inputs");
  }
  const findUser = await user.findOne({ email });
  if (!findUser) {
    res.status(400).json("user does not exist");
  }
  // check for correct password
  const passwordCheck = await bcrypt.compare(password, findUser.password);
  if (!passwordCheck) {
    res.status(400).json({ success: false, message: "incorrect password" });
  }
  createToken(res, findUser);
  res.json({
    success: true,
    message: `welcome ${findUser.username}`,
  });
});

//logout
const logoutController = asyncHandler(async (req, res) => {
  res.cookie("accessToken", "", {
    expires: new Date(0), // 7 days
    httpOnly: true, // ← Blocks JS access (no XSS)
  });
  res.status(200).json("logout succesful");
});

//get all users
const getAllUsers = asyncHandler(async (req, res) => {
  const getUser = await user.find({});

  if (!getUser) {
    res.status(400).send("unable to get users at the moment");
  } else {
    res.status(200).json(getUser);
  }
});

//get single user
const getSingleUser = asyncHandler(async (req, res) => {
  const singleUser = req.params.id;
  const getUser = await user.findById(singleUser);
  if (getUser) {
    res.status(200).json({
      message: "success",
      data: getUser,
    });
  } else {
    res.status(400).send(`Unable to get user with id ${singleUser}`);
  }
});

//update user
const updateUser = asyncHandler(async (req, res) => {
  const selectedUser = req.params.id;
  const upddateData = req.body;
  const editUser = await user.findByIdAndUpdate(selectedUser, upddateData, {
    new: true,
  });
  if (editUser) {
    res.status(200).json({
      message: `role changed, new role ${editUser.role}`,
    });
  } else {
    res.status(400).send(`Unable to update user with id ${selectedUser}`);
  }
});

const deleteUser = asyncHandler(async (req, res) => {
  const selectedUser = req.params.id;
  const deletedUser = await user.findByIdAndDelete(selectedUser);
  if (deletedUser) {
    res.status(200).json({
      message: `user ${deletedUser.username} has been deleted successfully`,
    });
  } else {
    res.status(400).send(`Unable to delete user with id ${selectedUser}`);
  }
});

//get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  // req.user is set by authenticate middleware
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

module.exports = {
  createUser,
  loginUser,
  logoutController,
  getAllUsers,
  getSingleUser,
  updateUser,
  deleteUser,
  getUserProfile,
};
