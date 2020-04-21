const File = require('./file.model');

const getAllFiles = (req, res) => {
    File.find({ userId: req.body.userId  })
        .then(files => {
            res.status(200).json(files)
        })
        .catch(err => {
            res.status(500).send(err)
        })
};

const getOneFile = (req, res) => {
    File.findOne({ fileName: req.body.filename  })
        .exec()
        .then(file => {
            res.status(200).json(file)
        })
        .catch(err => {
            res.status(500).send(err)
        })
};

const createFile = (req, res) => {
    const newfile = new File(req.body)
    File.findOne({ fileName: req.body.filename })
        .then(file => {
            newfile.save()
                .then(file => {
                    res.status(200).json(file)
                })
                .catch(err => {
                    res.status(500).send(err.message)
                })
        })
        .catch(err => {
            res.status(500).send(err)
        })
};

const updateFile = (req, res) => {
    const id = req.params.id
    const update = req.body

    if (Object.keys(update).length === 0) return res.status(400).send("Bad Request");
    File.findOneAndUpdate({ _id: id}, update)
        .then(oldFile => {
            File.findOne({ _id: oldFile.id })
                .exec()
                .then(newFile => {
                    res.status(200).json(newFile)
                })
                .catch(() => {
                    res.status(404).json("Not found")
                })
        })
        .catch(() => {
            res.status(404).json("Not found")
        })
};

const deleteFile = (req, res) => {
    File.findOneAndDelete({ _id: req.params.id })
        .then(file => {
            if (!file) return res.status(404).json("File Not found")
            const payload = {
                file,
                msg: "File was deleted"
            }
            res.status(202).json(payload)
        })
        .catch(err => {
            res.status(500).send(err)
        })
};

module.exports = fileController = {
    getAllFiles,
    getOneFile,
    createFile,
    updateFile,
    deleteFile
}