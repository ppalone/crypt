const User = require('../../models/User');
const crypto = require('crypto');
const sendgridService = require('../../services/sendgrid');

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
      user.passwordTokenExpirty = Date.now() + 60 * 5;
    } catch (err) {
      console.log(err);
      res.send('Server Internal error');
    }
  },
};
