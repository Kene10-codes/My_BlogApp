const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { isEmail } = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email cannot be empty'],
        lowercase: true,
        unique: true,
        validate: [isEmail, 'Email already exists'],
    },
    password: {
        type: String,
        required: [true, 'password cannot be empty'],
        minlength: [6, 'Password must be above 6 characters'],
    },
})

// after saving a doc to db
userSchema.post('save', function (doc, next) {
    next()
})

// save and hash password
userSchema.pre('save', async function (next) {
    // generate salt
    // hash the password witht the gen. salt
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// statics login method
userSchema.statics.login = async (email, password) => {
    const user = await this.findOne({ email })
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user
        }
        throw Error('incorrect password')
    }
    throw Error('Incorrect email')
}
const User = mongoose.model('user', userSchema)

module.exports = User
