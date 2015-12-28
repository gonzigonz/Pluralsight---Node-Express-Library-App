var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {

    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    bookRouter.use(bookController.middleware);

    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .all(bookController.allById)
        .get(bookController.getById);
    return bookRouter;

};

module.exports = router;