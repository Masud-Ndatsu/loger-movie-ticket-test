const Joi = require("joi");

const movieValidationSchema = Joi.object({
  name: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow(""), // Allows an optional description
  duration: Joi.number().integer().min(1).required(), // Duration must be a positive integer (in minutes)
  release_date: Joi.date().required(), // Valid date required
  price: Joi.string()
    .pattern(/^[0-9]+(NGN|USD|GBP|EUR)?$/)
    .required(), // Ensures the price is a valid string with optional currency code
});

module.exports = { movieValidationSchema };
