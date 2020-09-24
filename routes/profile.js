const router = require('express').Router();
const bcrpyt = require('bcrypt');
const User = require('../models/User');

const authMiddleware = require('../middlewares/auth');

// router.use(authMiddleware.ensureAuthenticated);

router.get('/profile', authMiddleware.ensureAuthenticated, async (req, res) => {
  // Get the current logged in user
  try {
    let user = await User.findById({ _id: req.user._id });
    res.render('profile/profile.ejs', { user });
  } catch (err) {
    res.send('Server internal error');
    console.log(err);
  }
});

router.get(
  '/changepassword',
  authMiddleware.ensureAuthenticated,
  (req, res) => {
    res.render('profile/changepassword');
  },
);

router.post(
  '/changepassword',
  authMiddleware.ensureAuthenticated,
  async (req, res) => {
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
);

module.exports = router;
