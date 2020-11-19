const bcrpyt = require('bcrypt');
const User = require('../../models/User');
const Blog = require('../../models/Blog');

const { validationResult } = require('express-validator');

// @route GET /profile
// @desc get user profile
const getProfile = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.user._id });
    res.render('profile/profile.ejs', { user });
  } catch (err) {
    console.log(err);
    res.send('Server internal error');
  }
};

// @route GET /changepassword
// @desc Get the form to change the password
const getChangePassword = (req, res) => {
  res.render('profile/changepassword');
};

// @route POST /changepassword
// @desc change password
const changePassword = async (req, res) => {
  try {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render('profile/changepassword', {
        errors: errors.array()[0].msg,
      });
    }

    const { oldpassword, newpassword } = req.body;
    let user = await User.findById({ _id: req.user._id });
    let isMatch = await bcrpyt.compare(oldpassword, user.password);

    if (!isMatch) {
      return res.render('profile/changepassword', {
        errors: 'Incorrect Old Password',
      });
    }

    if (oldpassword === newpassword) {
      return res.render('profile/changepassword', {
        errors: 'Old & New passwords are same',
      });
    }
    let salt = await bcrpyt.genSalt(10);
    user.password = newpassword;
    await user.save();

    req.flash('success_msg', 'Password changed successfully');
    res.redirect('/profile');
  } catch (err) {
    console.log(err);
    res.send('Server Internal error');
  }
};

// @route DELETE /delete
// @desc delete user profile & all blogs
const deleteProfile = async (req, res) => {
  try {
    await User.findByIdAndRemove({ _id: req.user._id });
    await Blog.deleteMany({ author: req.user._id });
    // Logout the user
    req.logout();
    req.flash('success_msg', 'Account deleted successfully');
    res.redirect('/login');
  } catch (err) {
    console.log('Error: ', err);
    res.send('Server Internal Error');
  }
};

module.exports = {
  getProfile,
  getChangePassword,
  changePassword,
  deleteProfile,
};
