const User = require('../../models/User');
const Blog = require('../../models/Blog');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const PAGE_LIMIT = 5;

// @route GET /blogs
// @query page, from, to
// @desc Get all blogs
const getAllBlogs = async (req, res) => {
  let page;
  let user = await User.findById({ _id: req.user._id });
  let length = user.blogs.length;
  let totalPages = Number.isInteger(length / PAGE_LIMIT)
    ? length / PAGE_LIMIT
    : Math.floor(length / PAGE_LIMIT) + 1;
  let blogs, fromDate, toDate;

  // Check of the filters from date exist
  if (!req.query.from && !req.query.to) {
    // Pagination
    page = req.query.page || 1;
    page = parseInt(page, 10);

    blogs = await Blog.find({ author: req.user._id })
      .sort({ createdAt: -1 })
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
};

// @route GET /blogs/new
// @desc Get form to create new blog
const getCreateBlog = (req, res) => res.render('./blogs/add');

// @route POST /blogs
// @desc Create a new blog
const createBlog = async (req, res) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('blogs/add', {
        title: req.body.title,
        post: req.body.post,
        errors: errors.array()[0].msg,
      });
    }

    const { title, post } = req.body;

    // Create a new blog
    let newBlog = new Blog({
      title: title,
      post: post,
      author: req.user._id,
    });

    // Save it to the database
    let blog = await newBlog.save();
    let user = await User.findById({ _id: req.user._id });

    // Add blog to the user
    user.blogs.push(blog._id);

    await user.save();

    // Everything went well
    res.redirect('/blogs');
  } catch (err) {
    console.log(err);
    res.send('Server Internal Error');
  }
};

// @route GET /blogs/:id
// @desc Get the specific blog
const getBlogById = async (req, res) => {
  try {
    // Validated the blog id
    if (!mongoose.Types.ObjectId.isValid(req.params.id))
      return res.render('./errors/404');

    let id = req.params.id;

    let user = await User.findById({ _id: req.user._id });

    // Check if the blog id exists in user's blogs
    if (!user.blogs.includes(id)) {
      res.render('errors/404');
    }

    let blog = await Blog.findById({ _id: id });

    res.render('./blogs/blog', {
      blog,
    });
  } catch (err) {
    console.log(err);
    res.send('Server Internal Error');
  }
};

// @route GET /blogs/:id/edit
// @desc Page to edit blog
const getEditBlog = async (req, res) => {
  try {
    let blog = await Blog.findById({ _id: req.params.id });
    res.render('./blogs/edit', {
      blog,
    });
  } catch (err) {
    console.log(err);
    res.send('Server Internal error');
  }
};

// @route PATCH /blogs/:id/edit
// @desc Edit the blog
const editBlog = async (req, res) => {
  try {
    let blogid = req.params.id;
    let blog = await Blog.findById({ _id: blogid });
    await Blog.findByIdAndUpdate({ _id: blog._id }, req.body);
    res.redirect(`/blogs/${blog._id}`);
  } catch (err) {
    console.log(err);
    res.send('Server Internal error');
  }
};

// @route DELETE /blog/:id/delete
// @desc Delete a blog post
const deleteBlog = async (req, res) => {
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
};

module.exports = {
  getAllBlogs,
  getCreateBlog,
  createBlog,
  getBlogById,
  getEditBlog,
  editBlog,
  deleteBlog,
};
