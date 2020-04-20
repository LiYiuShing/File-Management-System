const express = require('express');
const fileRouter = express.Router();
const fileController = require('./file.controller');

fileRouter
    .route("/")
    .get(fileController.getAllFiles)
    .post(fileController.createFile)


fileRouter
    .route("/:fileid")
    .get(fileController.getOneFile)
    .post(fileController.createFile)
    .put(fileController.updateFile)
    .delete(fileController.deleteFile)

module.exports = fileRouter;