import Organization from "../models/organization";
import Inventory from "../models/Inventory";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import { Request, Response } from "express";
import { Roles } from "../models/Role";
import { createOrganizationSchema } from "../validations/organizationValidation";
import User from "../models/User";

interface CustomRequest extends Request {
  user?: any;
}

const createOrganization = asyncHandler(
  async (req: CustomRequest, res: Response): Promise<void> => {
    const error = createOrganizationSchema.validate(req.body).error;
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }

    req.body.admin = req.user._id;

    const organization = new Organization(req.body);
    await organization.save();

    // assign the creator as ADMIN
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ message: "User not found" });
      return;
    }

    user.roles.push({
      organization: new mongoose.Types.ObjectId(
        (organization._id as mongoose.Types.ObjectId).toString()
      ),
      role: Roles.ADMIN,
    });

    await user.save();

    // Create an inventory for the organization
    const inventory = new Inventory({
      ownerType: "Organization",
      owner: organization._id,
    });
    await inventory.save();

    organization.inventory = new mongoose.Types.ObjectId(
      (inventory._id as mongoose.Types.ObjectId).toString()
    );
    await organization.save();

    res.status(200).json({
      message: "Organization created successfully",
      organization: organization,
    });
  }
);

const getOrganization = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const organization = await Organization.findById(id);
    res.status(200).json({ organization: organization });
  }
);

export { createOrganization, getOrganization };
