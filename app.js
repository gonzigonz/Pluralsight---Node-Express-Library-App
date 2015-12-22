var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-parser');
var passport = require('passport');

var sql = require('mssql');

// SQL Config
var config = {
    user: 'devuser',
    password: 'devpassword',
    server: '10.1.1.154',
    database: 'DevSampleData'
};
sql.connect(config, function (err) {
    console.log(err);
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
app.use(session({secret: 'library'}));
app.use(passport.initialize());
app.use(passport.session());
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