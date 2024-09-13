import express from "express";
const router = express.Router();

import { register } from "../controllers/authController";

router.post("/register", register)

export default router;