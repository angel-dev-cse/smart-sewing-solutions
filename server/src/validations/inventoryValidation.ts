import Joi from "joi";

const createInventorySchema = Joi.object({
  ownerType: Joi.string().valid("Organization", "User").default("Organization"),
  owner: Joi.string().required(),
  warehouse: Joi.string().required(),
});

const addMachineSchema = Joi.object({
  machineName: Joi.string().required(),
  machineBrand: Joi.string().required(),
  machineModel: Joi.string().required(),
  serial: Joi.string().required(),
  ownerType: Joi.string().valid("Organization", "User").default("Organization"),
  owner: Joi.string().required(),
  price: Joi.number().default(0),
  rent: Joi.number().default(0),
  remarks: Joi.string(),
  status: Joi.string().valid("active", "inactive", "defective").default("active"),
});

export { createInventorySchema, addMachineSchema };