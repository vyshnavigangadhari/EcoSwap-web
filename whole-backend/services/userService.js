// services/userService.js
import User from "../models/user.js";

// Register a new user
const registerUser = async (userData) => {
  const newUser = new User(userData);
  return await newUser.save();
};

// Login user
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (user && user.comparePassword(password)) {
    return user;
  }
  throw new Error("Invalid credentials");
};

// Get user profile
const getUserProfile = async (userId) => {
  return await User.findById(userId);
};

// Update user profile
const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, { new: true });
};

export default {
  registerUser,
  loginUser,
  getUserProfile,
  updateUser,
};
