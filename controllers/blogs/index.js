const Blog = require('../../models/blogs')

const handleErrors = (err) => {
    const errors = { title: '', body: '', author: '' }
    if (err.message.includes('blog validation failed')) {
        Object.values(err.errors).forEach(
            ({ properties: { path, message } }) => {
                errors[path] = message
            }
        )
    }
    console.log(errors)
    return errors
}

// get all blogs
const get_all_blogs = (req, res) => {
    Blog.find()
        .then((result) => {
            res.render('blogs/index', { title: 'HOME', blogs: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

// get create new blog page func
const get_create_new_blog = (req, res) => {
    res.render('blogs/create', { title: 'NEW BLOG' })
}

// add new blog func
const post_new_blog = (req, res) => {
    const blog = new Blog(req.body)

    // save blog
    blog.save()
        .then((result) => {
            res.redirect('/')
        })
        .catch((err) => {
            const errors = handleErrors(err)
            res.status(401).json({ errors })
        })
}

// go to a blog
const get_a_blog = (req, res) => {
    const id = req.params.id
    Blog.findById(id)
        .then((result) => {
            res.render('blogs/details', { title: 'BLOG DETAILS', blog: result })
        })
        .catch((err) => {
            console.log(err)
        })
}

// delete a blog
const delete_a_blog = (req, res) => {
    const id = req.params.id
    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err)
        })
}

// export controller func
module.exports = {
    get_all_blogs,
    get_create_new_blog,
    get_a_blog,
    post_new_blog,
    delete_a_blog,
}
