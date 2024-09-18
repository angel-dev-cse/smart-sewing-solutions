import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User";
import asyncHandler from "express-async-handler";
import { registerSchema, loginSchema } from "../validations/authValidation";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req:Request, res:Response): Promise<void> => {
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

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req:Request, res:Response): Promise<void> => {
  const { email, password } = req.body;

  const error = loginSchema.validate(req.body).error;

  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  const user = await User.findOne({email});

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    res.status(401).json({ message: "Invalid credentials" });
    return;
  }

  const accessToken = jwt.sign({userId:user._id, tokenType:"access"}, process.env.JWT_SECRET as string, {expiresIn: "15m"});
  const refreshToken = jwt.sign({userId:user._id, tokenType:"refresh"}, process.env.JWT_SECRET as string, {expiresIn: "7d"});

  res.status(200).json({ message: "User logged in successfully", accessToken, refreshToken });
});

const requestPasswordReset = asyncHandler(async (req:Request, res:Response): Promise<void> => {
  const { email } = req.body;

  const user = await User.findOne({email});

  if(!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

  user.passwordResetToken = resetTokenHash;
  user.passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 minutes

  await user.save();

  
});

export { register, login };
