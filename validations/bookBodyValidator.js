const joi = require('joi');

const Schema = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  genre: joi.string().required(),
  read: joi.boolean().required(),
});

module.exports = Schema;