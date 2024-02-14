const jwt = require('jsonwebtoken')
const User = require('../../models/users/index')

// get signup page
// post signup form
// get login page
// post login page

// handle  custom errors
const handleErrors = (err) => {
    const errors = { email: '', password: '' }

    if (err.message === 'incorrect email') {
        return (errors.email = 'Incorrect email')
    }

    if (err.message === 'incorrect password') {
        return (errors.password = 'Incorrect password')
    }

    if (err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(
            ({ properties: { path, message } }) => {
                errors[path] = message
            }
        )
    }
    return errors
}

// store max age in a variable
const maxAge = 3 * 60 * 60 * 24

// create a jsonweb token
const createToken = (id) => {
    return jwt.sign({ id }, 'secret key value', {
        expiresIn: maxAge,
    })
}

const get_signup_page = (req, res) => {
    res.render('auth/signup', { title: 'SIGN UP ' })
}

const post_signup_page = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.create({ email, password })
        const token = createToken(user._id)
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true })
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
}

const get_login_page = (req, res) => {
    res.render('auth/login', { title: 'LOGIN ' })
}

const post_login_page = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        console.log(user)
        const token = createToken(user._id)
        res.cookie('jwt', token, { maxAge: maxAge * 1000, httpOnly: true })
        res.status(201).json({ user: user._id })
    } catch (err) {
        const errors = handleErrors(err)
        res.json({ errors })
    }
}

const get_logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
}
// export controller func
module.exports = {
    get_login_page,
    get_signup_page,
    post_signup_page,
    post_login_page,
    get_logout,
}
