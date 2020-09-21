const router = require('express').Router();
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

router.get('/changepassword', authMiddleware.ensureAuthenticated, (req, res) => {
  res.render('profile/changepassword');
});

module.exports = router;
