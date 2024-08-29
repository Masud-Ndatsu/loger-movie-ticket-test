const Joi = require("joi");

const ticketValidationSchema = Joi.object({
  movieIds: Joi.array()
    .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
    .min(1)
    .required(),

  time_booked: Joi.date(),
});

module.exports = { ticketValidationSchema };
