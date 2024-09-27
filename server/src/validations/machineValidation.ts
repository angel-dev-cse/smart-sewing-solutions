import joi from "joi";

const machineNameSchema = joi.object({
  name: joi.string().required(),
});

const machineBrandSchema = joi.object({
  brand: joi.string().required(),
})

const machineModelSchema = joi.object({ 
  brand: joi.string().required(),
  modelName: joi.string().required(),
});

export {machineNameSchema, machineBrandSchema, machineModelSchema};