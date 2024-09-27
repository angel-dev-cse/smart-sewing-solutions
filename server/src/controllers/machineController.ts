import MachineName from "../models/MachineName";
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {machineBrandSchema, machineModelSchema, machineNameSchema} from "../validations/machineValidation";
import MachineBrand from "../models/MachineBrand";
import MachineModel from "../models/MachineModel";

const addMachineName = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const error = machineNameSchema.validate(req.body).error;

    if(error) {
      res.status(400).json({message: error.message});
      return;
    }

    const machineName = new MachineName(req.body);
    await machineName.save();

    res.status(200).json({message: "Machine name created successfully", machineName: machineName});
  }
);

const addMachineBrand = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const error = machineBrandSchema.validate(req.body).error;

    if(error) {
      res.status(400).json({message: error.message});
      return;
    }

    const machineBrand = new MachineBrand(req.body);
    await machineBrand.save();

    res.status(200).json({message: "Machine brand created successfully", machineBrand: machineBrand});
  }
);

const addMachineModel = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const error = machineModelSchema.validate(req.body).error;

    if(error) {
      res.status(400).json({message: error.message});
      return;
    }

    const machineModel = new MachineModel(req.body);
    await machineModel.save();

    res.status(200).json({message: "Machine model created successfully", machineModel: machineModel});
  }
);


export { addMachineName, addMachineBrand, addMachineModel };