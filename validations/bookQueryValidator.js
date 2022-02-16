const joi = require('joi');

const Schema = joi.alternatives().try(
  joi.object({
    title: joi.string().required(),
  }),
  joi.object({
    author: joi.string().required(),
  })
);

module.exports = Schema;