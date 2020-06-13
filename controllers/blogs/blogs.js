const User = require('../../models/User');
const Blog = require('../../models/Blog');

module.exports = {
    getAllBlogs: (req, res) => {
        User.findOne({ _id: req.user._id }).populate('blogs').exec()
            .then(user => {
                res.render('./blogs/blogs', {
                    blogs: user.blogs
                });
            })
            .catch(err => console.log(err));
    },
    createBlog: (req, res) => {
        // res.send('Save Blog to Database');
        const { title, body } = req.body;
        /*
         * Create a New Blog
         * Add to the user
         * redirect back to /blogs
         */
        let newBlog = new Blog({
            title,
            body
        });

        newBlog
            .save()
            .then(blog => {
                User
                    .findById(req.user._id)
                    .then(user => {
                        user.blogs.push(blog);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));

        res.redirect('/blogs');
    }
}