const jwt = require('jsonwebtoken')
const User = require('../models/users')

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret key here', function (err, decodedToken) {
            if (err) {
                res.redirect('/login')
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect('/login')
    }
}

// checkUser middlewarev
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
        jwt.verify(token, 'secret key here', async (err, decodedToken) => {
            if (err) {
                res.locals.user = ''
                next()
            } else {
                const user = await User.findById(decodedToken._id)
                res.locals.user = user
                next()
            }
        })
    } else {
        res.locals.user = ''
        next()
    }
}

// export middleware
module.exports = { requireAuth, checkUser }
