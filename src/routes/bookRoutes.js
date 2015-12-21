var express = require('express');

var bookRouter = express.Router();

var books = [
    {
        'title': 'Pride and Prejudice',
        'genre': 'Fiction',
        'author': 'Jane Austen',
        'read': false
    },
    {
        'title': 'War and Peace',
        'genre': 'Fiction',
        'author': 'Leo Tolstoy',
        'read': false
    },
    {
        'title': 'Hamlet',
        'genre': 'Fiction',
        'author': 'William Shakespeare',
        'read': true
    },
    {
        'title': 'Moby Dick',
        'genre': 'Fiction',
        'author': 'Herman Melville',
        'read': true
    },
    {
        'title': 'The Great Gatsby',
        'genre': 'Fiction',
        'author': 'F. Scott Fitzgerald',
        'read': true
    },
    {
        'title': 'The Adventures of Huckleberry',
        'genre': 'Fiction',
        'author': 'Mark Twain',
        'read': true
    },
    {
        'title': 'Alice"s Adventures in Wonderland',
        'genre': 'Fiction',
        'author': 'Lewis Carroll',
        'read': false
    }
    ];

bookRouter.route('/')
    .get(function (req, res) {
        res.render('bookListView', {
            title: 'Books',
            nav: [{
                link: '/Books',
                text: 'Books'
            }, {
                link: '/Authors',
                text: 'Authors'
            }],
            books: books
        });
    });

bookRouter.route('/:id')
    .get(function (req, res) {
        var id = req.params.id;
        res.render('bookView', {
            title: 'Book',
            nav: [{
                link: '/Books',
                text: 'Books'
            }, {
                link: '/Authors',
                text: 'Authors'
            }],
            book: books[id]
        });
    });

module.exports = bookRouter;