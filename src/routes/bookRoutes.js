var express = require('express');
var sql = require('mssql');

var bookRouter = express.Router();

var router = function (nav) {
    var books = [];

    bookRouter.route('/')
        .get(function (req, res) {

            var request = new sql.Request();
            request.query('select * from books',
                function (err, recordset) {
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: recordset
                    });
                });
        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('bookView', {
                title: 'Book',
                nav: nav,
                book: books[id]
            });
        });

    return bookRouter;
};

module.exports = router;