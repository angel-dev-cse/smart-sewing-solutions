import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../models/User";
import Inventory from "../models/Inventory";
import Warehouse from "../models/Warehouse";
import asyncHandler from "express-async-handler";

import {
  registerSchema,
  loginSchema,
  requestPasswordResetSchema,
  resetPasswordSchema,
} from "../validations/authValidation";
import mongoose from "mongoose";

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    console.log(req.body);

    const user = new User(req.body);
    await user.save();

    const warehouse = new Warehouse({
      name: "Personal Warehouse",
      warehouseType: "User",
      belongsTo: user._id,
      address: user.address,
      manager: user._id,
      remarks: "Personal warehouse for storing items",
    });

    await warehouse.save();

    // Create an inventory for the user
    const inventory = new Inventory({
      ownerType: "User",
      owner: user._id,
      warehouse: warehouse._id,
    });
    await inventory.save();

    user.inventory = new mongoose.Types.ObjectId((inventory._id as mongoose.Types.ObjectId).toString());
    await user.save();

    res
      .status(200)
      .json({ message: "User registered successfully", user: user });
  }
);

// @desc    Login a user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const error = loginSchema.validate(req.body).error;

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const accessToken = jwt.sign(
      { userId: user._id, tokenType: "access" },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, tokenType: "refresh" },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      accessToken,
      refreshToken,
    });
  }
);

const requestPasswordReset = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const error = requestPasswordResetSchema.validate(req.body).error;

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordTokenExpires = new Date(Date.now() + 10 * 60 * 1000); // valid for 10 minutes

    await user.save();

    // email the reset token to the user
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Password Reset",
      text: `You can reset your password using this link: ${process.env.CLIENT_URL}/reset-password/${resetToken}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error)
        return res
          .status(500)
          .json({ error: "Error sending email", details: error.message });
      res.json({ message: "Password reset email sent" });
    });
  }
);

const resetPassword = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const error = resetPasswordSchema.validate({
      token: req.params.token,
      password: req.body.password,
    }).error;

    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { token } = req.params;
    const { password } = req.body; // new password

    // Hash the provided token to compare
    const resetTokenHash = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({ error: "Invalid or expired token" });
      return;
    }

    // Reset password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();

    res.json({ message: "Password reset successful" });
  }
);

const refreshAccessToken = asyncHandler(async(req: Request, res: Response): Promise<void> => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res.status(401).json({ message: "No refresh token provided!" });
    return;
  }

  // Verify the refresh token
  jwt.verify(
    refreshToken,
    process.env.JWT_SECRET as string,
    (err: any, decodedToken: any) => {
      if (err || decodedToken.tokenType !== "refresh") {
        return res.status(403).json({ message: "Invalid refresh token!" });
      }

      // Generate a new access token
      const newAccessToken = jwt.sign(
        { userId: decodedToken.userId, tokenType: "access" },
        process.env.JWT_SECRET as string,
        { expiresIn: "15m" }
      );

      res.status(200).json({ accessToken: newAccessToken });
    }
  );
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  // remove accessToken and refreshToken from client side
  res.json({ message: "Logged out successfully" });
});

export {
  register,
  login,
  requestPasswordReset,
  resetPassword,
  refreshAccessToken,
  logout,
};
