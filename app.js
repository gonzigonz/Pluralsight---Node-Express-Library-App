var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var sql = require('mssql');

// Connect to Database
var config = require('./src/config/sql-conf');
sql.connect(config, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Connection to SQL Server - Ok');
    }
});

// Navigation Object
var nav = [{
    link: '/Books',
    text: 'Books'
}, {
    link: '/Authors',
    text: 'Authors'
}];

// Routers
var bookRouter = require('./src/routes/bookRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

// App Config
var port = process.env.PORT || 5000;
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'library'
}));
require('./src/config/passport')(app);

app.use('/Books', bookRouter);
app.use('/Auth', authRouter);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});

// Start Website
app.listen(port, function (err) {
    console.log('Running server on port ' + port);
});