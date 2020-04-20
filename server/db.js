var mongoose = require('mongoose');

mongoose.Promise = global.Promise;


var connect = () => {
    let connecturl = process.env.DB_CONNECT
    return mongoose.connect(
        connecturl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })
        .then(() => {
            console.log('MONGODB CONNECTED')
        })
        .catch(err => {
            console.log(err)
        })
};

module.exports = connect;