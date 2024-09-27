import express from "express";
const router = express.Router();

import { addMachineName, addMachineBrand, addMachineModel } from "../controllers/machineController";
import { authAccessJWT, authSysAdmin } from "../middlewares/authMiddleware";

router.post("/name", authAccessJWT, authSysAdmin, addMachineName);
router.post("/brand", authAccessJWT, authSysAdmin, addMachineBrand);
router.post("/model", authAccessJWT, authSysAdmin, addMachineModel);

export default router;