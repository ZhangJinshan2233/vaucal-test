'use strict';

const userService = require('../service/user');
const safeAwait = require('safe-await');
const { UserFacingError } = require('../utils/error');
const { hashPassword, comparePassword, createAccessToken } = require('../utils');

const userController = {

    getAllUsers: async (req, res) => {
        const [err, users] = await safeAwait(userService.getAll());
        if (err) throw err;
        res.status(200).json({
            users
        })
    },

    signIn: async (req, res) => {
        let {
            email,
            password
        } = req.body
        let isMatch = false;
        let user = await userService.getUserByEmail(email);
        if (!user) {
            throw new UserFacingError('The user ID and password don\'t match.');
        }
        isMatch = comparePassword(password, user.password);
        if (!isMatch) throw new UserFacingError('The user ID and password don\'t match.');
        const accessToken = createAccessToken(user)
        res.status(200)
            .json({
                ...user,
                accessToken
            })
    },

    createUser: async (req, res) => {
        let {
            email,
            password,
            ...otherProperties
        } = req.body;
        try {
            const user = await userService.getUserByEmail(email);

            if (user) {
                throw new UserFacingError('email exist already')
            }
            let hashPwd = hashPassword(password)
            await userService.insert({ email, password: hashPwd, ...otherProperties });
            res.status(201).json({
                message: "created successfully"
            })
        } catch (error) {
            throw error
        }
    },

    getUserById: async (req, res) => {
        const [err, user] = await safeAwait(userService.getOne(req.params.id));
        console.log(user)
        if (err) throw err;
        res.status(200).json({
            user
        })
    },

    updateUser: async (req, res) => {
        const [err, message] = await safeAwait(userService.update(req.params.id, req.body));
        if (err) throw err;
        res.status(200).json({
            message: "updated successfully"
        })
    },

    deleteUser: async (req, res) => {
        const [err, message] = await safeAwait(userService.delete(req.params.id));
        if (err) throw err;
        res.status(200).json({
            message: "removed successfully"
        })
    }

}

module.exports = userController