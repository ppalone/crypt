const User = require('../../models/User');
const crypto = require('crypto');
const sendgridService = require('../../services/sendgrid');

const setExpiryTime = () => {
  let date = new Date();
  date.setMinutes(date.getMinutes() + 10);
  return date;
};

// @route GET /forget
// @desc Get the forget password form
const getForgetFrom = (req, res) => res.render('./users/forget');

// @route POST /forget
// @desc Send the password forget token to the user
const sendForgetToken = async (req, res) => {
  try {
    let email = req.body.email;
    let user = await User.findOne({ email: email });
    if (!user) {
      req.flash('error_msg', 'Email is not registered');
      return res.redirect('/forget');
    }

    // Generate a token
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
    res.redirect('/forget');
  } catch (err) {
    console.log(err);
    res.send('Server Internal error');
  }
};

module.exports = {
  getForgetFrom,
  sendForgetToken,
};
