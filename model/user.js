var user = function () {

    var userModel = mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        updated_at: {
            type: Date,
            default: Date.now()
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        dateOfBirth: {
            type: Date
        },
        profile: {
            type: String
        },
        location: {
            lat: { type: String },
            lon: { type: String }
        },
        fcm_token: {
            type: String
        }
    });

    _userModel = mongoose.model('User', userModel);

    var error_obtained = "",
        result_obtained = "";

    var _login = function (jsondata, callback) {
        Joi.validate(jsondata, schemaValitator.login_validate, function (err, value) {
            if (!err) {
                _userModel.findOne({ "username": jsondata.username }, function (err, user) {
                    if (!err) {
                        if (user) {
                            user.comparePassword(jsondata.password, function (err, isMatch) {
                                if (isMatch && !err) {
                                    var token = jwt.sign({
                                        data: user
                                    }, config.secret, {
                                            expiresIn: 60 * 60
                                        });
                                    user = user.toObject();
                                    delete user.password;
                                    result_obtained = {
                                        user: user,
                                        token: 'JWT ' + token,
                                        message: message.success_login,
                                        code: 200,
                                        success: true
                                    };
                                    callback(null, result_obtained);
                                } else {
                                    error_obtained = {
                                        message: message.error_password,
                                        code: 200,
                                        success: false,
                                        data: null
                                    };
                                    callback(error_obtained, null);
                                }
                            });
                        } else {
                            error_obtained = {
                                message: message.error_noUser,
                                code: 200,
                                success: false,
                                data: null
                            };
                            callback(error_obtained, null);
                        }
                    } else {
                        error_obtained = {
                            message: err,
                            code: 400,
                            success: false,
                            data: null
                        };
                        callback(error_obtained, null);
                    }
                });
            } else {
                error_obtained = {
                    message: err,
                    code: 400,
                    success: false,
                    data: null
                };
                callback(error_obtained, null);
            }
        });

    };


    var _register = function (jsondata, callback) {
        Joi.validate(jsondata, schemaValitator.register_validate, function (err, value) {
            if (!err) {
                var newUser = new _userModel({
                    username: jsondata.username,
                    email: jsondata.email,
                    password: jsondata.password,
                    created_at: Date.now()
                });
                newUser.save(function (err, user) {
                    if (!err) {
                        user = user.toObject();
                        delete user.password;
                        result_obtained = {
                            data: user,
                            message: message.success_register,
                            code: 200,
                            success: true
                        };
                        callback(null, result_obtained);
                    } else {
                        error_obtained = {
                            message: message.error_userAlreadyExist,
                            code: 400,
                            success: false,
                            data: null
                        };
                        callback(error_obtained, null);
                    }
                });
            } else {
                error_obtained = {
                    message: err,
                    code: 400,
                    success: false,
                    data: null
                };
                callback(error_obtained, null);
            }
        });
    };



    var _getAllUsers = function (callback) {
        _userModel.find({}, function (err, users) {
            if (!err) {
                if (users.length > 0) {
                    user = user.toObject();
                    delete user.password;
                    result_obtained = {
                        data: users,
                        message: message.success_getUserProfile,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    result_obtained = {
                        data: [],
                        message: message.error_no_result,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                }
            } else {
                error_obtained = {
                    message: err,
                    code: 400,
                    success: false,
                    data: null
                };
                callback(error_obtained, null);
            }
        });
    };





    return {
        userModel: _userModel,
        login: _login,
        register: _register,
        getAllUser: _getAllUsers
    };


}();
module.exports = user;