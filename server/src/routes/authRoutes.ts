import express from "express";
const router = express.Router();

import { register, login, requestPasswordReset, resetPassword, refreshAccessToken, logout } from "../controllers/authController";


router.post("/register", register)
router.post("/login", login)
router.post("/request-password-reset", requestPasswordReset)
router.post("/reset-password/:token", resetPassword)
router.post("/refresh-token", refreshAccessToken)
router.post("/logout", logout)

export default router;