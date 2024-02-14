const express = require('express')
const {
    get_signup_page,
    post_signup_page,
    get_login_page,
    post_login_page,
    get_logout,
} = require('../../controllers/users')

const router = express.Router()

router.get('/signup', get_signup_page)
router.post('/signup', post_signup_page)
router.get('/login', get_login_page)
router.post('/login', post_login_page)
router.get('/logout', get_logout)

// export router
module.exports = router
