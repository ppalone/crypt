const User = require('../../models/User');

// @route GET /reset/:token
// @desc Get the reset form
const getResetPassword = async (req, res) => {
  try {
    let { token } = req.params;
    if (!token) res.redirect('/forget');
    let user = await User.findOne({
      passwordResetToken: token,
      passwordTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return res.send('Invalid Link or Link Expired!');
    }
    res.render('users/reset', { token: token });
  } catch (err) {
    console.log(err);
    res.send('Server Internal Error');
  }
};

// @route POST /reset/:token
// @desc Reset the password
const resetPassword = async (req, res) => {
  try {
    let { token } = req.params;
    if (!token) return res.redirect('/forget');

    let user = await User.findOne({
      passwordResetToken: token,
      passwordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.send('Invalid Link or Link Expired!');
    }

    const { password, confirmpassword } = req.body;
    if (password !== confirmpassword) {
      req.flash('error_msg', 'Passwords do not match');
      return res.redirect(`/reset?token=${token}`);
    }

    user.passwordResetToken = '';
    user.passwordTokenExpiry = undefined;
    user.password = password;
    await user.save();

    req.flash('success_msg', 'Password reset successful');
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.send('Server internal error');
  }
};

module.exports = {
  getResetPassword,
  resetPassword,
};
