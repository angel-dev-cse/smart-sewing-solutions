import Inventory from "../models/Inventory";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";

import { createInventorySchema } from "../validations/inventoryValidation";

const createInventory = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const error = createInventorySchema.validate(req.body).error;
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    const inventory = new Inventory(req.body);
    await inventory.save();

    res
      .status(200)
      .json({
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

export { createInventory, getInventory };
