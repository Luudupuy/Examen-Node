const joi = require('joi');

const Schema = joi.alternatives().try(
  joi.object({
    userName: joi.string()
  })
);

module.exports = Schema;