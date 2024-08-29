const Joi = require("joi");

const userValidationSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  phone_number: Joi.string()
    .pattern(/^[0-9]+$/)
    .length(13)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginUserSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = { userValidationSchema, loginUserSchema };
