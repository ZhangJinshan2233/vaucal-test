'use strict'
const express = require('express');

const morgan = require('morgan');

const passport = require('passport');

const {
    passportMiddleware

} = require('./middlewares')

const cors = require('cors');

const app = express();

const routers = require('./routers');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

passportMiddleware(passport);

app.use(passport.initialize());

app.use(morgan('dev'));
// refer to routes
app.use(routers)

// error handler for not existed api
app.use(function (req, res, next) {
    const err = new Error('No found api');
    err.status = 400;
    next(err);
})

//error handler for all kinds of error
app.use(function (err, req, res, next) {

    if (err.name === 'UserFacingError') {
        res.status(404)
            .json({
                message: err.message
            })
    } else if (res.status === 401) {
        res.status(401)
            .json({
                message: "Unauthorized"
            })
    } else {
        res.status(500)
            .json({
                message: "internal server error"
            })
    }
})

module.exports = app