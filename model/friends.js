var friends = function () {

    var friendModel = mongoose.Schema({
        user_id: {
            type: String,
            required: true
        },
        friend_id: {
            type: String,
            required: true
        },
        profile: [],
        request_profile: [],
        status: {
            type: Boolean,
            required: false
        }
    });

    var _friendsModel = mongoose.model('Friends', friendModel);

    var error_obtained = "", result_obtained = "";

    var _getFriendsList = function (user_id, callback) {
        if (user_id != null && user_id != undefined && user_id != "") {
            _friendsModel.find({ $and: [{ "user_id": user_id }, { "status": true }] }, function (err, friends) {
                if (!err) {
                    result_obtained = {
                        data: friends,
                        message: message.success_getData,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    error_obtained = {
                        data: err,
                        message: message.error_getData,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            });
        } else {
            error_obtained = {
                data: [],
                message: message.error_invalid_params,
                code: 400,
                success: false
            };
            callback(error_obtained, null);
        }
    };

    var _getFriendProfile = function (friend_id, callback) {
        if (friend_id != null && friend_id != undefined && friend_id != "") {
            userController.userModel.findById({ "_id": friend_id }, function (err, profile) {
                if (!err) {
                    result_obtained = {
                        data: profile,
                        message: message.success_getData,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    error_obtained = {
                        data: err,
                        message: message.error_getData,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            });
        } else {
            error_obtained = {
                data: [],
                message: message.error_invalid_params,
                code: 400,
                success: false
            };
            callback(error_obtained, null);
        }
    };

    var _getFriendRequest = function (user_id, callback) {
        if (user_id != null && user_id != undefined) {
            _friendsModel.find({ $and: [{ "friend_id": user_id }, { "status": false }] }, function (err, requests) {
                if (!err) {
                    result_obtained = {
                        data: requests,
                        message: message.success_getData,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    error_obtained = {
                        data: err,
                        message: message.error_getData,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            });
        } else {
            error_obtained = {
                data: [],
                message: message.error_invalid_params,
                code: 400,
                success: false
            };
            callback(error_obtained, null);
        }
    };

    var _sendFriendRequest = function (jsonData, callback) {
        var friends = new _friendsModel(jsonData);
        friends.save(function (err, data) {
            if (!err) {
                result_obtained = {
                    data: data,
                    message: message.success_friendRequest,
                    code: 200,
                    success: true
                };
                callback(null, result_obtained);
            } else {
                error_obtained = {
                    data: err,
                    message: message.error_friendRequest,
                    code: 204,
                    success: false
                };
                callback(error_obtained, null);
            }
        })
    };

    var _acceptFriendRequest = function (jsonData, callback) {
        if ((jsonData.user_id != undefined && jsonData.user_id != null) || (jsonData.request_id != undefined && jsonData.request_id != null)) {
            var data = { "staus": true };
            var updateUserModal = jsonData.friendInfo;
            _friendsModel.findByIdAndUpdate({ "_id": jsonData.request_id }, { $set: data }, function (err, data) {
                if (!err) {
                    userController.userModel.update({ "_id": jsonData.user_id }, { $set: updateUserModal }, function (err, user) {
                        if (err) {
                            error_obtained = {
                                data: err,
                                message: message.error_noUser,
                                code: 204,
                                success: false
                            };
                            callback(error_obtained, null);
                        }
                    });
                    result_obtained = {
                        data: data,
                        message: message.success_acceptRequest,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);

                } else {
                    error_obtained = {
                        data: err,
                        message: message.error_acceptRequest,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            });
        } else {
            error_obtained = {
                data: [],
                message: message.error_invalid_params,
                code: 400,
                success: false
            };
            callback(error_obtained, null);
        }
    };

    var _declineFriendRequest = function (request_id, callback) {
        if (request_id != null && request_id != undefined) {
            _friendsModel.remove({ "_id": request_id }, function (err, data) {
                if (!err) {
                    result_obtained = {
                        data: data,
                        message: message.success_decline,
                        code: 200,
                        success: true
                    };
                    callback(null, result_obtained);
                } else {
                    error_obtained = {
                        data: err,
                        message: message.error_decline,
                        code: 204,
                        success: false
                    };
                    callback(error_obtained, null);
                }
            });
        } else {
            error_obtained = {
                data: [],
                message: message.error_invalid_params,
                code: 400,
                success: false
            };
            callback(error_obtained, null);
        }
    };



    return {
        friendModel: _friendsModel,
        getFriends: _getFriendsList,
        getFriendProfile: _getFriendProfile,
        getFriendRequest: _getFriendRequest,
        sendFriendRequest: _sendFriendRequest,
        acceptRequest: _acceptFriendRequest,
        declineRequest: _declineFriendRequest
    }

};
module.exports = friends;