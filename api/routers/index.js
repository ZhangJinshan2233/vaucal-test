'use strict'
const router = require('express').Router();

const userRouter = require('./userRouter');

router.use('/api/v0/users', userRouter);

module.exports = router