/* eslint-disable no-console */
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'dev';
}
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: `./.${process.env.NODE_ENV}.env`});
}

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./router/index');

const { PORT } = process.env;

app.use(morgan('dev'));

// express middleware
app.use(bodyParser.json());

// use cors so that front end application can access this api
app.use(cors());

app.get('/', function(req, res) {
    res.status(200).send('All good!');
 //   res.sendFile(path.join(__dirname + '/index.html'));  
});

app.use('/home', router);

app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`);
});

// sure of error
app.use(function(err, req, res, next) {
    if (err.status) {
        return res.status(err.status).json({ message: err.message });
    }
    next(err);
});

//  not sure of error 
app.use(function (err, req, res, next) {
 console.log(err);
 res.status(500).json({message: 'Server error'});
 next();
});

module.exports = app;