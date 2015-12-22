var express = require('express');
var sql = require('mssql');

var bookRouter = express.Router();

var router = function (nav) {
    var books = [];

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
        .get(function (req, res) {

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
                            res.render('bookView', {
                                title: 'Book',
                                nav: nav,
                                book: recordset[0]
                            });
                        });
                });
        });

    return bookRouter;
};

module.exports = router;