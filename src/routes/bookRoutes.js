var express = require('express');
var sql = require('mssql');

var bookRouter = express.Router();

var router = function (nav) {

    bookRouter.use(function (req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });

    bookRouter.route('/')
        .get(function (req, res) {

            var request = new sql.Request();
            request.query(
                'SELECT * FROM BOOKS',
                function (err, recordset) {
                    res.render('bookListView', {
                        title: 'Books',
                        nav: nav,
                        books: recordset
                    });
                });
        });

    bookRouter.route('/:id')
        .all(function (req, res, next) {
            var id = req.params.id;
            var preparedQuery = new sql.PreparedStatement();

            preparedQuery.input('Id', sql.Int);
            preparedQuery.prepare(
                'SELECT * FROM BOOKS WHERE ID = @Id',
                function (err) {
                    preparedQuery.execute({
                            Id: id
                        },
                        function (err, recordset) {
                            if (recordset.length === 0) {
                                res.status(404).send('Not Found');
                            } else {
                                req.book = recordset[0];
                                next();
                            }
                        });
                });
        })
        .get(function (req, res) {
            res.render('bookView', {
                title: 'Book',
                nav: nav,
                book: req.book
            });
        });
    return bookRouter;

};

module.exports = router;