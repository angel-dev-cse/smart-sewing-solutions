import express from "express";
const router = express.Router();

import { register } from "../controllers/userController";

router.post("/register", register)

export default router;