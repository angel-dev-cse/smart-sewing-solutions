import express from "express";
const router = express.Router();

import { authAccessJWT } from "../middlewares/authMiddleware";
import { createOrganization, getOrganization } from "../controllers/organizationController";
import { createWarehouse } from "../controllers/warehouseController";


router.post("/", authAccessJWT, createOrganization);
router.get("/:id", authAccessJWT, getOrganization);

router.post("/:id/warehouses/create", authAccessJWT, createWarehouse);

export default router;