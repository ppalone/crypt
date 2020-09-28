const User = require('../../models/User');
const Blog = require('../../models/Blog');
const mongoose = require('mongoose');
const PAGE_LIMIT = 5;

module.exports = {
  getAllBlogs: async (req, res) => {
    let page;
    let user = await User.findById({ _id: req.user._id });
    let length = user.blogs.length;
    let totalPages = Math.floor(length / PAGE_LIMIT) + 1;
    let blogs, fromDate, toDate;

    // Check of the filters from date exist
    if (!req.query.from && !req.query.to) {
      // No. of blogs
      page = req.query.page || 1;
      page = parseInt(page, 10);
      blogs = await Blog.find({
        author: req.user._id,
      })
        .sort({
          createdAt: -1,
        })
        .skip(PAGE_LIMIT * page - PAGE_LIMIT)
        .limit(PAGE_LIMIT);
    } else {
      // Date filters
      fromDate = req.query.from || user.createdAt;
      toDate = req.query.to || Date.now();
      blogs = await Blog.find({
        author: req.user._id,
        createdAt: {
          $gt: new Date(new Date(fromDate).setHours(00, 00, 00)),
          $lt: new Date(new Date(toDate).setHours(23, 59, 59)),
        },
      });
    }

    res.render('blogs/blogs', {
      blogs,
      length,
      totalPages,
      page,
      fromDate,
      toDate,
    });
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
      author: req.user._id,
    });

    newBlog
      .save()
      .then((blog) => {
        // console.log(blog)
        User.findById(req.user._id)
          .then((user) => {
            // console.log(user);
            user.blogs.push(blog._id);
            user
              .save()
              .then(() => res.redirect('/blogs'))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
  getBlogById: (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.render('./errors/404');

    let id = req.params.id;
    User.findById(req.user._id)
      .then((user) => {
        /**
         * Check if the blog with given id exists in user's blogs
         */
        let found = user.blogs.includes(id);
        // console.log(found);
        if (!found) {
          res.render('errors/404');
        }
        Blog.findById(id)
          .then((blog) => {
            res.render('./blogs/blog', {
              blog,
            });
          })
          .catch((err) => console.log(err));
        // res.send('Access denied');
      })
      .catch((err) => console.log(err));
  },
  getEditBlog: async (req, res) => {
    try {
      let blog = await Blog.findById({ _id: req.params.id });
      res.render('./blogs/edit', {
        blog,
      });
    } catch (err) {
      console.log(err);
      res.send('Server Internal error');
    }
  },
  editBlog: async (req, res) => {
    try {
      // TODO: Sanitize the request
      let blogid = req.params.id;
      let blog = await Blog.findById({ _id: blogid });
      await Blog.findByIdAndUpdate({ _id: blog._id }, req.body);
      res.redirect(`/blogs/${blog._id}`);
    } catch (err) {
      console.log(err);
      res.send('Server Internal error');
    }
  },
  deleteBlog: async (req, res) => {
    try {
      let blog = await Blog.findByIdAndDelete({ _id: req.params.id });
      if (!blog) return res.send('Blog does not exist');
      let user = await User.findById({ _id: req.user._id });
      user.blogs.pull(req.params.id);
      await user.save();
      res.redirect('/blogs');
    } catch (err) {
      console.log(err);
      res.send('Server Internal error');
    }
  },
};
