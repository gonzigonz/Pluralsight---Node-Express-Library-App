var express = require('express');

var app = express();

var port = process.env.PORT || 5000;
var bookRouter = express.Router();

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

bookRouter.route('/')
    .get(function (req, res) {
        res.send('Books page');
    });

bookRouter.route('/Single')
    .get(function (req, res) {
        res.send('Single Books page');
    });

app.use('/Books', bookRouter);

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            link: '/Books',
            text: 'Books'
        }, {
            link: '/Authors',
            text: 'Authors'
        }]
    });
});

app.get('/books', function (req, res) {
    res.send('hello books');
});

app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});