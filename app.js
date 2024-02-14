const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const blogRoutes = require('./routes/blogs')
const authRoutes = require('./routes/auth')
const { requireAuth } = require('./middleware')
const PORT = 3000

// initialize express
const app = express()

// connect to the DB
const connectDB = async () => {
    try {
        await mongoose
            .connect(
                'mongodb+srv://myblog:blOg12345@nodetut.n6pqp.mongodb.net/blog-info'
            )
            .then(() => {
                app.listen(PORT, () => {
                    console.log(`DB is connected successfully on port ${PORT}`)
                })
            })
            .catch((err) => console.log(err))
    } catch (err) {
        console.log(err)
    }
}

// invoke the func
connectDB()

// set ejs
app.set('view engine', 'ejs')

// middleware init
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

// blog routes
app.use('/blogs', blogRoutes)

// auth routes
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

// app.get('/blogs', requireAuth, (req, res) => {
//     res.render('blogs/index')
// })

app.get('/about', (req, res) => {
    res.render('about', { title: 'ABOUT US' })
})

// 404 page
app.use((req, res) => {
    res.render('404', { title: '404' })
})
