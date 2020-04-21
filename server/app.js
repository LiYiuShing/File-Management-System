var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var dotenv = require('dotenv');
var cors = require('cors');
var bodyParser = require('body-parser');

var connect = require('./db')
var restRoute = require('./src/api/restRouter');

var app = express();

// Env
dotenv.config();

//Database
connect();


//Middleware
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//Router
app.use('/api', restRoute);

app.listen(5000, () => console.log('Server Up and running'))