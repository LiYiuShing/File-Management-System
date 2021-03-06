const jwt = require('jsonwebtoken');
const User = require('../resources/user/user.model');
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.TOKEN_SECRET;

const register = (req, res) => {
    const { email, password } = req.body
    User.findOne({ email: email })
        .then(existUser => {
            if (existUser) return res.status(404).send("Email already exists")
            let user = new User({ email, password })
            const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                expiresIn: 7200
            })
            const userId = user.id
            const userName = user.email
            const payload = { userId , token, userName }
            user
                .save()
                .then(() => {
                    res.status(201).json(payload)
                })
                .catch(err => {
                    const message = err.message
                    res.status(500).json({
                        status: 'Registration Failed',
                        msg: message
                    })
                })
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
};

const login = (req, res) => {
    const { email, password } = req.body
    User.findOne(
        { email: email }
    )
        .exec()
        .then(user => {
            if (!user) return res.status(404).send("User does not exist")
            user.comparePassword(password, (err, isMatch) => {
                if (err) return res.status(500).send("Error Email OR Password!")
                if (isMatch) {
                    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
                        expiresIn: 7200
                    })
                    const userId = user.id
                    const userName = user.email
                    const payload = { userId, token, userName }
                    res.status(200).json(payload)
                } else {
                    return res.status(401).send("Invaild password")
                }
            })
        })
        .catch(err => {
            res.status(500).send(err.message)
        })
};

const protect = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(400).send("Bad request")
    }
    var token = req.headers.authorization
    token = token.replace('Bearer', '')
    jwt.verify(token, JWT_SECRET, err => {
        if (err) return res.status(401).send("Unauthorized")
        next()
    })
}

module.exports = auth = { register, login, protect };