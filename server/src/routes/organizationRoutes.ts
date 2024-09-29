import express from "express";
const router = express.Router();

import { authAccessJWT } from "../middlewares/authMiddleware";
import { createOrganization, getOrganization } from "../controllers/organizationController";
import { createWarehouse } from "../controllers/warehouseController";
import { addMachine } from "../controllers/inventoryController";


router.post("/", authAccessJWT, createOrganization);
router.get("/:id", authAccessJWT, getOrganization);

router.post("/:id/warehouses/create", authAccessJWT, createWarehouse);
router.post("/:id/machines/add", authAccessJWT, addMachine);

export default router;