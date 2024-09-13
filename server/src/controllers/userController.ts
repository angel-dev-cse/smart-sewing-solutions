import User from "../models/user";
import asyncHandler from "express-async-handler";

export const register = asyncHandler(async(req, res) => {
  console.log(req.body);
})

module.exports = {register}