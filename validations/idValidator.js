const joi = require('joi');

const Schema = joi.alternatives().try(
  joi.object({
    bookId: joi.string().alphanum().required()
  }),
  joi.object({
    userId: joi.string().alphanum().required()
  })
);

module.exports = Schema;