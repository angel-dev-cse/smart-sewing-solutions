import User from "../models/User";
import asyncHandler from "express-async-handler";

const getAnUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.status(200).json(user);
});

export {getAnUser};