var sql = require('mssql');

var bookController = function (bookService, nav) {

    var middleware = function (req, res, next) {
        //if (!req.user) {
        // res.redirect('/');
        //}
        next();
    };

    var getIndex = function (req, res) {

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
    };

    var allById = function (req, res, next) {
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
    };

    var getById = function (req, res) {

        var vm = req.book;

        bookService.getBookById(vm.GoodReadsId,
            function (err, book) {
                vm.book = book;
                res.render('bookView', {
                    title: 'Book',
                    nav: nav,
                    vm: vm
                });

            });

    };

    return {
        middleware: middleware,
        getIndex: getIndex,
        allById: allById,
        getById: getById
    };
};

module.exports = bookController;