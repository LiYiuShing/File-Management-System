const express = require('express');
const userRouter = express.Router();
const userController = require('./user.controller');

userRouter
    .route("/:id")
    .get(userController.getOneUser)

module.exports = userRouter;