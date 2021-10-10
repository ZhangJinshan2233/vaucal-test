'use strict'
const passportMiddleware = require('./passport');
const authorize=require('./authorize')
module.exports = {
    passportMiddleware,
    authorize
}