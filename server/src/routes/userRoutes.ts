import express from "express"
const router = express.Router();

import { getAnUser } from "../controllers/userController";

router.get("/:id", getAnUser);

export default router;