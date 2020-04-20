const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcypt = require('bcryptjs');
const SALT = 10;

const schema = {
    userId: {
        sparse: true,
        type: String,
        unique: true
    },
    email: {
        type: String,
        require: [true, "User email is required"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "User password is required"],
    },
    token: {
        type: String,
        require: false
    }
};

const userSchema = new Schema(schema, { timestamps: true })

//HASH PASSWORD
userSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) return next()

    bcypt.genSalt(SALT, (err, salt) => {
        if (err) return next(err)

        bcypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
});

//ComparePassword
userSchema.methods.comparePassword = function(password, cb) {
    bcypt.compare(password, this.password, (err, isMatch) => {
        if(err) return cb(err)
        cb(null, isMatch)
    })
};

userSchema.set('toJSON', {
    transform: (doc, ret) => {
        let retJson = {
            userId: ret.userId,
            email: ret.email,
            password: ret.password,
            token: ret.token, 
            id: ret._id
        }
        return retJson
    }
});

mongoose.set('useCreateIndex', true);
module.exports = mongoose.model('User', userSchema, 'users');