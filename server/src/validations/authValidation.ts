import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
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
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

const requestPasswordResetSchema = Joi.object({
  email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
  token: Joi.string(),
  password: Joi.string().required().min(5),
});

export { registerSchema, loginSchema, requestPasswordResetSchema, resetPasswordSchema };
