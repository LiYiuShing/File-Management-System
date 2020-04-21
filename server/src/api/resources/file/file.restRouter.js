const express = require('express');
const fileRouter = express.Router();
const fileController = require('./file.controller');

fileRouter
    .route("/upload")
    .post(fileController.createFile)

fileRouter.route("/get")
    .post(fileController.getAllFiles)

fileRouter
    .route("/:id")
    .get(fileController.getOneFile)
    .post(fileController.createFile)
    .put(fileController.updateFile)
    .delete(fileController.deleteFile)

module.exports = fileRouter;