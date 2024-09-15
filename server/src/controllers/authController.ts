import {Request, Response} from "express";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { registerSchema } from "../validations/authValidation";

export const register = asyncHandler(async (req:Request, res:Response): Promise<void> => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  console.log(req.body);

  const user = new User(req.body);
  await user.save();

  res.status(200).json({ message: "User registered successfully", user: user });
});

module.exports = { register };
