import asyncHandler from "express-async-handler";
import Organization from "../models/organization";
import Warehouse from "../models/Warehouse";
import { Request, Response } from "express";
import { createWarehouseSchema } from "../validations/organizationValidation";

interface CustomRequest extends Request {
  user?: any;
}

const createWarehouse = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const error = createWarehouseSchema.validate(req.body).error;
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    console.log(req.params);

    const { id } = req.params;
    const organization = await Organization.findById(id);

    const user = req.user;

    if (!user) {
      res.status(403).json({ message: "Unauthorized access!" });
      return;
    }

    if (!organization) {
      res.status(404).json({ message: "Organization not found" });
      return;
    }

    if (organization.admin.toString() !== user._id.toString()) {
      res.status(403).json({ message: "Unauthorized access!" });
      return;
    }

    req.body.organization = organization._id;

    const warehouse = new Warehouse(req.body);

    res.status(200).json({
      message: "Warehouse created successfully",
      warehouse: warehouse,
    });
  }
);

export { createWarehouse };
