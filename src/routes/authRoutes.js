var express = require('express');

var authRouter = express.Router();

var router = function () {

    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
        });

    return authRouter;
};

module.exports = router;