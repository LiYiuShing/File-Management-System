const User = require('./user.model');

const getAllUsers = (req, res) => {
    User.find({})
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
};

const getOneUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .exec()
        .then(user => {
            res.status(200).json(user)
        })
        .catch(err => {
            res.status(500).json(err)
        })
};


module.exports = userController = {
    getAllUsers,
    getOneUser,
}