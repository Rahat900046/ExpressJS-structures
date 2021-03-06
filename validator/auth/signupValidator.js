const {
    body
} = require('express-validator')

const User = require('../../models/User')

module.exports = [
    body('username')
    .isLength({
        min: 5,
        max: 15
    })
    .withMessage('Username must be between 2 to 15 Charecter')
    .custom(async username => {
        let user = await User.findOne({
            username
        })
        if (user) {
            return Promise.reject('Username Alreay Used')
        }
    })
    .trim(),
    body('email')
    .isEmail().withMessage('Please Provide a valid Email')
    .custom(async email => {
        let user = await User.findOne({
            email
        })
        if (user) {
            return Promise.reject('Email Already Used')
        }
    })
    .normalizeEmail(),
    body('password')
    .isLength({
        min: 5
    }).withMessage('Your password must be 5 Charecters'),
    body('conformPassword')
    .isLength({
        min: 5
    }).withMessage('Your password must be 5 Charecters')
    .custom((confirmPassword, {
        req
    }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Password Does not matched')
        }
        return true
    })

]