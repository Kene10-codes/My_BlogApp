const express = require('express')
const {
    get_all_blogs,
    post_new_blog,
    delete_a_blog,
    get_a_blog,
    get_create_new_blog,
} = require('../../controllers/blogs')

// initialize express
const router = express.Router()

// get all blogs
router.get('/', get_all_blogs)
// get create new blog
router.get('/create', get_create_new_blog)
// add new blog
router.post('/add-blog', post_new_blog)
// ger a blog
router.get('/:id', get_a_blog)
// delete a blog
router.delete('/:id', delete_a_blog)

module.exports = router
