const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/auth').ensureAuthenticated;
const blogsController = require('../controllers/blogs/blogs');

router.use(ensureAuthenticated);

router
    .get('/blogs', blogsController.getAllBlogs)
    .post('/blogs', blogsController.createBlog)
    .get('/blogs/new', blogsController.getBlogForm)
    .get('/blogs/:id', blogsController.getBlogById);

module.exports = router;