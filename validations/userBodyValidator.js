const joi = require('joi');

const Schema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  userName: joi.string().alphanum().required(),
  password: joi.string().alphanum().min(6).max(14).required(),
  email: joi.string().email().required(),
  address: joi.string().required(),
  phone: joi.number().required()
});

module.exports = Schema;