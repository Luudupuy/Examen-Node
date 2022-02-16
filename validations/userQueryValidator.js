const joi = require('joi');

const Schema = joi.alternatives().try(
  joi.object({
    userName: joi.string().required()
  }),
  joi.object({
    email: joi.string().required()
  })
);

module.exports = Schema;