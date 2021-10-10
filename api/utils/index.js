'use strict'
const bcrypt = require('bcrypt')
const config = require('../config');
const jwt = require('jsonwebtoken');

//  hash password
const hashPassword = (password)=>{
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

//compare password
const comparePassword=(inputPwd, acturalPwd)=>{
    return bcrypt.compare(inputPwd, acturalPwd);
}


const createAccessToken = (user, timeDuration) => {
    let duration = timeDuration ? timeDuration : '45m';
    return jwt.sign({
            id: user.id,
            isAdmin: user.isAdmin,
        },

        config.accessTokenKey, {
            expiresIn: duration
        })
}
module.exports = {
    hashPassword,
    comparePassword,
    createAccessToken
}