const express = require('express');
const userController = require('../controllers/userController');
const validator = require('express-joi-validation').createValidator();
const userBodyValidator = require('../validations/userBodyValidator');
const userQueryValidator = require('../validations/userQueryValidator');
const idValidator = require('../validations/idValidator');

const routes = (User) => {
  const userRouter = express.Router();
  const { getUsers, getUserById, getUserByUserName, postUser, putUserById, deleteUserById, login } = userController(User);

  userRouter.route('/users')
    .get(validator.query(userQueryValidator), getUsers, getUserByUserName)
    .post(validator.body(userBodyValidator), postUser);

  userRouter.route('/users/:userId')
    .get(validator.params(idValidator), getUserById)
    .put(validator.params(idValidator), validator.body(userBodyValidator), putUserById)
    .delete(validator.params(idValidator), deleteUserById);

  userRouter.route('/users/login')
    .post(login);

  return userRouter;
};

module.exports = routes;