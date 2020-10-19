const User = require('../../models/User');
const Token = require('../../models/Token');

module.exports = {
  verifyUser: async (req, res) => {
    try {
      let foundtoken = await Token.findOne({ token: req.query.token });
      if (!foundtoken) return res.send('Link expired');
      let user = await User.findById({ _id: foundtoken.userid });
      if (!user) return res.send('No user attached to this token!');

      if (user.isVerified) {
        req.flash('error_msg', 'Email is already verified');
        return res.redirect('/users/login');
      }

      // Verify the user
      user.isVerified = true;
      user.expireAt = null;
      await user.save();

      req.flash(
        'success_msg',
        'Email verification successful now you can login!',
      );
      res.redirect('/users/login');
    } catch (err) {
      console.log(err);
      res.send('Server Internal Error');
    }
  },
};
