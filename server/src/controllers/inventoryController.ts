import Inventory from "../models/Inventory";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import {
  addMachineSchema,
  createInventorySchema,
} from "../validations/inventoryValidation";
import Machine from "../models/Machine";
import Organization from "../models/organization";
import mongoose from "mongoose";
import { Roles } from "../models/Role";
import User from "../models/User";

const createInventory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const error = createInventorySchema.validate(req.body).error;
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const inventory = new Inventory(req.body);
    await inventory.save();

    res.status(200).json({
      message: "Inventory created successfully",
      inventory: inventory,
    });
  }
);

const getInventory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const inventory = await Inventory.findById(id);
    res.status(200).json({ inventory: inventory });
  }
);

interface CustomRequest extends Request {
  user?: any;
}

// @DESC add machine to inventory
// @Route POST /api/inventory/:id/machine
// @Access Private
// @Validation addMachineSchema, mahcineModel, inventory
const addMachine = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const error = addMachineSchema.validate(req.body).error;
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const { id } = req.params;
    const inventory = await Inventory.findById(id);

    if (!inventory) {
      res.status(404).json({ message: "Inventory not found" });
      return;
    }

    // check if the user is an admin of the organization
    if (inventory.ownerType === "Organization") {
      const user = await User.findById(req.user._id);
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      const organization = await Organization.findById(inventory.owner);
      if (!organization) {
        res.status(400).json({ message: "Organization not found" });
        return;
      }

      const roles = user.roles.filter(
        (role) =>
          role.organization.toString() ===
          (organization?._id as mongoose.Types.ObjectId).toString()
      );
      if (roles.length === 0) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }

      if (roles[0].role !== Roles.ADMIN) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
    } else {
      if (inventory.owner.toString() !== req.user._id) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
    }

    const machine = new Machine(req.body);
    machine.uniqueKey = `${machine.machineBrand}-${machine.machineModel}-${machine.serial}`;
    machine.inventory = new mongoose.Types.ObjectId(
      inventory._id as mongoose.Types.ObjectId
    );
    await machine.save();

    res
      .status(200)
      .json({ message: "Machine added successfully", machine: machine });
  }
);

export { createInventory, getInventory, addMachine };
