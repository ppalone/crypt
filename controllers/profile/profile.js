const User = require('../../models/User');
const bcrpyt = require('bcrypt');
const Blog = require('../../models/Blog');

module.exports = {
  getProfile: async (req, res) => {
    try {
      let user = await User.findById({ _id: req.user._id });
      res.render('profile/profile.ejs', { user });
    } catch (err) {
      console.log(err);
      res.send('Server internal error');
    }
  },
  getChangePassword: (req, res) => {
    res.render('profile/changepassword');
  },
  changePassword: async (req, res) => {
    try {
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
      res.send('Server Internal error');
      console.log(err);
    }
  },
  delete: async (req, res) => {
    try {
      await User.findByIdAndRemove({ _id: req.user._id });
      await Blog.deleteMany({ author: req.user._id });
      // Logout the user
      req.logout();
      req.flash('success_msg', 'Account deleted successfully');
      res.redirect('/users/login');
    } catch (err) {
      console.log('Error: ', err);
      res.send('Server Internal Error');
    }
  },
};
