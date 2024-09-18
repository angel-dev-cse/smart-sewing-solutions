import express from "express"
const router = express.Router();

import { authenticateJWT } from "../middlewares/authMiddleware";
import { getAnUser, getUsers } from "../controllers/userController";

router.get("/:id", getAnUser);
router.get("/", authenticateJWT, getUsers);

export default router;