import User from "../models/user";
import asyncHandler from "express-async-handler";

// @desc    Get a user by id
// @route   GET /api/users/:id
// @access  Private
// @var     id: string
const getAnUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json(user);
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.status(200).json({users});
});

export { getAnUser, getUsers };
