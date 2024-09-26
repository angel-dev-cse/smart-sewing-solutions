import express from "express";
const router = express.Router();

import { createInventory, getInventory } from "../controllers/inventoryController";

router.post("/", createInventory);
router.get("/:id", getInventory);

export default router;