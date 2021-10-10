const userRouter = require('express').Router();
const {authorize}=require('../middlewares');
const {
    userController
} = require('../controllers');
const passport = require('passport')

userRouter
    .route('')
    .get(passport.authenticate('jwt', {
        session: false
    }), authorize,userController.getAllUsers)
    .post(userController.createUser)

userRouter
    .route('/signin')
    .post(userController.signIn)

userRouter
    .route('/:id')
    .get(passport.authenticate('jwt', {
        session: false
    }), userController.getUserById)
    .put(passport.authenticate('jwt', {
        session: false
    }), userController.updateUser)
    .delete(passport.authenticate('jwt', {
        session: false
    }), userController.deleteUser)

module.exports = userRouter