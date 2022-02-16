const joi = require('joi');

const Schema = joi.alternatives().try(
  joi.object({
    title: joi.string(),
  }),
  joi.object({
    author: joi.string(),
  })
);

module.exports = Schema;