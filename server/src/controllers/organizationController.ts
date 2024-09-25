import Organization from "../models/organization";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createOrganizationSchema } from "../validations/organizationValidation";

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

    res
      .status(200)
      .json({
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