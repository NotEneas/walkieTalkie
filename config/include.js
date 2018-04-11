express = require('express');
app = express();
router = express.Router();
mongoose = require('mongoose');
Schema = mongoose.Schema;
winston=require('winston');
Joi=require('joi');
passport = require('passport');
JwtStrategy = require('passport-jwt').Strategy;
ExtractJwt = require('passport-jwt').ExtractJwt;
bcrypt = require('bcrypt-nodejs');
jwt = require('jsonwebtoken');

// Inject Configs
schemaValitator = require('./schemaValidator');
message =require('./messages');
controller = require('../controllers/modelController');


var server = require('http').createServer(app);
io = require('socket.io')(server);
server.listen(environment.socketPort || process.env.socketPORT);


// Enable Developer Logs
winston.add(winston.transports.File, {
    filename: 'logs/log.txt',
    json: false,
    maxsize: 5120,
    maxFiles: '5',
    timestamp: true,
    level: 'silly'
});