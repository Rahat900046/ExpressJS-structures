const User = require('../models/User')

exports.bindWithUserRequest = () => {
    return async (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return next()
        }
        try {
            let user = User.findById(req.session.user._id)
            req.user = user
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

exports.isAuthenticated = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        return res.redirect('/auth/login')
    }
    next()
}