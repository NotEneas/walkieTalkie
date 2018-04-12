router.route('/getFriends/:user_id').get(function (req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var user_id = req.params.user_id;
        friendsController.getFriends(user_id, function (err, data) {
            if (!err) {
                res.json({
                    result: data
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
            message: config.messages.common.invalid_parameter
        });
    }
});

router.route('/getFriendProfile/:user_id').get(function (req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        var user_id = req.params.user_id;
        friendsController.getFriendProfile(user_id, function (err, profile) {
            if (!err) {
                res.json({
                    result: data
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
            message: config.messages.common.invalid_parameter
        });
    }
});


router.route('/friendRequest').post(function (req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        friendsController.sendFriendRequest(req.body, function (err, data) {
            if (!err) {
                res.json({
                    result: data
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
            message: config.messages.common.invalid_parameter
        });
    }
});

router.route('/decline/:request_id').delete(function (req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        friendsController.declineRequest(req.params.request_id, function (err, data) {
            if (!err) {
                res.json({
                    result: data
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
            message: config.messages.common.invalid_parameter
        });
    }
});

router.route('/acceptFriendRequest').post(function (req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        friendsController.acceptRequest(req.body, function (err, data) {
            if (!err) {
                res.json({
                    result: data
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
            message: config.messages.common.invalid_parameter
        });
    }
});

router.route('/getFriendRequest/:user_id').get(function (req, res) {
    try {
        var infoMsg = {
            "url": req.originalUrl,
            "params": req.body || req.params,
            "data": req.body || req.query || req.params
        };
        winston.info(infoMsg);
        friendsController.getFriendRequest(req.params.user_id, function (err, data) {
            if (!err) {
                res.json({
                    result: data
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
            message: config.messages.common.invalid_parameter
        });
    }
});

module.exports = router;