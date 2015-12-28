var express = require('express');
var sql = require('mssql');
var passport = require('passport');

var authRouter = express.Router();

var router = function () {

    authRouter.route('/signUp')
        .post(function (req, res) {

            console.log(req.body);

            var user = {
                FirstName: 'Test',
                LastName: 'User',
                Username: req.body.userName,
                Password: req.body.password
            };

            var preparedQuery = new sql.PreparedStatement();
            preparedQuery.input('FirstName', sql.VarChar(50));
            preparedQuery.input('LastName', sql.VarChar(50));
            preparedQuery.input('Username', sql.VarChar(50));
            preparedQuery.input('Password', sql.VarChar(50));
            preparedQuery.prepare(
                'INSERT INTO Users (FirstName,LastName,Username,Password_Plain,ThumbnailUrl) ' +
                'VALUES (@FirstName,@LastName,@Username,@Password,null)' +
                'SELECT SCOPE_IDENTITY()',
                function (err) {
                    preparedQuery.execute(user,
                        function (err, recordset) {
                            if (err) {
                                res.status(400).send(err);
                            } else {
                                user.id = recordset[0][''];
                                console.log('INSERT Successful: ' + user.id);
                                req.login(user, function () {
                                    res.redirect('/auth/profile');
                                });
                            }
                        });
                });
        });

    authRouter.route('/signIn')
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(function (req, res, next) {
            if (!req.user) {
                res.redirect('/');
            }
            next();
        })
        .get(function (req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;