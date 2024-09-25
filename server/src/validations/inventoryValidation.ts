import Joi from "joi";

const createInventorySchema = Joi.object({
  ownerType: Joi.string().valid("Organization", "User").default("Organization"),
  owner: Joi.string().required(),
  warehouse: Joi.string().required(),
});

export { createInventorySchema };