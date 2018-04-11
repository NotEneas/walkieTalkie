router.route('/login').post(function (req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        userController.login(req.body, function (err, user) {
            if (!err) {
                res.json({
                    result: user
                });
            } else {
                res.json({
                    result: err
                });
            }
        });
    } catch (error) {
        res.json({
            result: error,
            code: 204,
            message: message.error_invalid_params
        });
    }
});


router.route('/register').post(function (req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        userController.register(req.body, function (err, user) {
            if (!err) {
                res.json({
                    result: user
                });
            } else {
                res.json({
                    result: err
                });
            }
        });
    } catch (err) {
        res.json({
            result: err,
            code: 204,
            message: message.error_invalid_params
        });
    }
});

router.get('/getAllUser', passport.authenticate('jwt', { session: true }), function(req, res) {
    var token = getToken(req.headers);
    if (token) {
        try {
            res.header("Access-Control-Allow-Origin", "*");
            var infoMsg = {
                "url": req.originalUrl,
                "params": req.query || req.params,
                "data": req.query || req.params
            };
            winston.info(infoMsg);
            userController.getAllUser(function(err, user) {
                if (!err) {
                    res.json({
                        result: user
                    });
                } else {
                    res.json({
                        result: err
                    });
                }
            });

        } catch (err) {
            res.json({
                result: err,
                code: 204,
                message:message.error_invalid_params
            });
        }
    } else {
        res.json({
            result: err,
            code: 401,
            message: message.error_authenticate
        });
    }
});

module.exports=router;