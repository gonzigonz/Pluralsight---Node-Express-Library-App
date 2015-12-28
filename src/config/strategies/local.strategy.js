var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var sql = require('mssql');

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {

            // Query the database for user
            var preparedQuery = new sql.PreparedStatement();
            preparedQuery.input('Username', sql.VarChar(50));
            preparedQuery.prepare(
                'SELECT TOP 1 * FROM dbo.users WHERE Username = @Username',
                function (err) {
                    preparedQuery.execute({
                            Username: username
                        },
                        function (err, recordset) {

                            if (recordset[0]['Password_Plain'] === password) {
                                var user = recordset[0];
                                done(null, user);
                            } else {
                                done(null, false, {
                                    message: 'Bad password'
                                });
                            }

                        });
                });
        }));
};