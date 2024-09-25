import e from "express";
import Joi from "joi";
import { createWarehouse } from "../controllers/warehouseController";

const createOrganizationSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  mobile: Joi.object({
    countryCode: Joi.string()
      .pattern(/^\+\d{1,3}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Country code must be in the format +1, +91, etc.",
        "any.required": "Country code is required",
      }),
    number: Joi.string()
      .pattern(/^\d{7,}$/)
      .required()
      .messages({
        "string.pattern.base": "Phone number must be at least 7 digits",
        "any.required": "Phone number is required",
      }),
  }).required(),
  address: Joi.object({
    building: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  category: Joi.array().items(Joi.string()).required(),
});

const createWarehouseSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  address: Joi.object({
    building: Joi.string().required(),
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    zip: Joi.string().required(),
    country: Joi.string().required(),
  }).required(),
  remarks: Joi.string().required(),
});

export { createOrganizationSchema, createWarehouseSchema };