const User = require('../../models/User');
const crypto = require('crypto');
const sendgridService = require('../../services/sendgrid');

function setExpiryTime() {
  let date = new Date();
  // Adds 10 min to the current time
  date.setMinutes(date.getMinutes() + 10);
  return date;
}

module.exports = {
  getForgetFrom: (req, res) => res.render('./users/forget'),
  sendForgetToken: async (req, res) => {
    try {
      let email = req.body.email;
      let user = await User.findOne({ email: email });
      if (!user) {
        req.flash('error_msg', 'Email is not registered');
        return res.redirect('/users/forget');
      }
      user.passwordResetToken = crypto.randomBytes(16).toString('hex');
      // Set the expiry time to be 10 min
      user.passwordTokenExpiry = setExpiryTime();
      let savedUser = await user.save();

      let sendgridResponse = await sendgridService.sendPasswordResetMail(
        savedUser.email,
        savedUser.passwordResetToken,
      );

      if (sendgridResponse && sendgridResponse[0].statusCode !== 202) {
        user.passwordResetToken = '';
        user.passwordTokenExpiry = undefined;
        await user.save();
        req.flash('error_msg', 'Error in Server, Please try again later');
        res.redirect('/users/forget');
      }

      // Everything went well
      req.flash(
        'success_msg',
        'Password reset mail has been to your email, Please check inbox for further instruction',
      );
      res.redirect('/users/forget');
    } catch (err) {
      console.log(err);
      res.send('Server Internal error');
    }
  },
  getResetPassword: async (req, res) => {
    try {
      let token = req.query.token;
      if (!token) res.redirect('/users/forget');
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
  },
  resetPassword: async (req, res) => {
    try {
      let token = req.query.token;
      if (!token) res.redirect('/users/forget');
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
        res.redirect(`/users/reset?token=${token}`);
      }
      user.passwordResetToken = '';
      user.passwordTokenExpiry = undefined;
      user.password = password;
      await user.save();
      req.flash('success_msg', 'Password reset successful');
      res.redirect('/users/login');
    } catch (err) {
      console.log(err);
      res.send('Server internal error');
    }
  },
};
