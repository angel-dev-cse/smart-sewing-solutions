import express from "express"
const router = express.Router();

import { getAnUser, getUsers } from "../controllers/userController";

router.get("/:id", getAnUser);
router.get("/", getUsers);

export default router;