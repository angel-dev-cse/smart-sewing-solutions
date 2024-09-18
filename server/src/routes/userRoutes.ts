import express from "express"
const router = express.Router();

import { authAccessJWT, authSysAdmin } from "../middlewares/authMiddleware";
import { getAnUser, getUsers } from "../controllers/userController";

router.get("/:id", authAccessJWT, getAnUser);
router.get("/", authAccessJWT, authSysAdmin, getUsers);

export default router;