const express = require('express');
const bookController = require('../controllers/bookController');
const validator = require('express-joi-validation').createValidator();
const bookBodyValidator = require('../validations/bookBodyValidator');
const bookQueryValidator = require('../validations/bookQueryValidator');
const idValidator = require('../validations/idValidator');

const routes = (Book) => {
  const bookRouter = express.Router();
  const { getBooks, getBooksById, getBooksByName, getBooksByAuthor, postBook, putBookById, deleteBooksById } = bookController(Book);

  bookRouter.route('/books')
    .get(validator.query(bookQueryValidator), getBooks, getBooksByName, getBooksByAuthor)
    .post(validator.body(bookBodyValidator), postBook);

  bookRouter.route('/books/:bookId')
    .get(validator.params(idValidator), getBooksById)
    .put(validator.params(idValidator), validator.body(bookBodyValidator), putBookById)
    .delete(validator.params(idValidator), deleteBooksById);

  return bookRouter;
};

module.exports = routes;