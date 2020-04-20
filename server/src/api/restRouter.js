const express = require("express");
const restRourer = express.Router();

const userRouter = require('./resources/user/user.restRouter');
const fileRouter = require('./resources/file/file.restRouter');


const { register, login, protect } = require('./modules/auth');

restRourer.route('/register').post(register);
restRourer.route('/login').post(login);

//Resource
restRourer.use('/files', fileRouter)
restRourer.use('/users', protect, userRouter)

module.exports = restRourer;