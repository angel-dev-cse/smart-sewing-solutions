import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  mobile: Joi.number().required(),
});

export { registerSchema };