const router = require('express').Router();
const User = require('../models/User');
const Token = require('../models/Token');

router.get('/verify', async (req, res) => {
  try {
    let foundtoken = await Token.findOne({ token: req.query.token });
    if (!foundtoken) return res.send('Link expired');
    let user = await User.findById({ _id: foundtoken.userid });
    if (!user) return res.send('No user attached to this token!');

    if (user.isVerified) {
      req.flash('error_msg', 'Email is already verified');
      return res.redirect('/users/login');
    }

    user.isVerified = true;
    user.expireAt = null;
    await user.save();
    req.flash(
      'success_msg',
      'Email verification successful now you can login!'
    );
    return res.redirect('/users/login');
  } catch (err) {
    console.log(err);
    res.send('Server Internal Error');
  }
});

module.exports = router;
