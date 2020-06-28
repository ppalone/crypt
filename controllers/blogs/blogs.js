const User = require('../../models/User');
const Blog = require('../../models/Blog');

module.exports = {
    getAllBlogs: (req, res) => {
        User.findOne({ _id: req.user._id }).populate('blogs').exec()
            .then(user => {
                console.log(user);
                res.render('./blogs/blogs', {
                    blogs: user.blogs
                });
            })
            .catch(err => console.log(err));
    },
    getBlogForm: (req, res) => res.render('./blogs/add'),
    createBlog: (req, res) => {
        // res.send('Save Blog to Database');
        const { title, post } = req.body;
        /*
         * Create a New Blog
         * Add to the user
         * redirect back to /blogs
         */
        let newBlog = new Blog({
            title: title,
            post: post,
            author: req.user._id
        });

        newBlog
            .save()
            .then(blog => {
                // console.log(blog)
                User
                    .findById(req.user._id)
                    .then(user => {
                        // console.log(user);
                        user.blogs.push(blog._id);
                        user
                            .save()
                            .then(() => res.redirect('/blogs'))
                            .catch(err => console.log(err)); 
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    },
    getBlogById: (req, res) => {
        let id = req.params.id;
        User
            .findById(req.user._id)
            .then(user => {
                /**
                 * Check if the blog with given id exists in user's blogs
                 */
                let found = user.blogs.includes(id);
                console.log(found);
                if (!found) {
                    res.send('Access denied!');
                }
                Blog
                    .findById(id)
                    .then(blog => {
                        res.render('./blogs/blog', {
                            blog
                        });
                    })
                    .catch(err => console.log(err));
                // res.send('Access denied');
            })
            .catch(err => console.log(err));
    }
}