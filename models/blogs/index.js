const mongoose = require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title cannot be empty'],
        },
        body: {
            type: String,
            required: [true, 'Content cannot be empty'],
        },
        author: {
            type: String,
            required: [true, 'Author cannot be empty'],
        },
    },
    { timestamps: true }
)

const Blog = mongoose.model('blog', blogSchema)

module.exports = Blog
