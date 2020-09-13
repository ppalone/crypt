const User = require('../../models/User');
const Token = require('../../models/Token');
const crypto = require('crypto');
const sendgridService = require('../../services/sendgrid');

module.exports = {
  getRegisterForm: (req, res) => res.render('./users/register'),
  registerUser: async (req, res) => {
    try {
      // TODO: validations on req.body
      let newuser = new User(req.body);
      let user = await newuser.save();
      let token = new Token({
        userid: user._id,
        token: crypto.randomBytes(16).toString('hex'),
      });
      let savedToken = await token.save();
      // console.log(savedToken.token);

      sendgridService.sendEmailVerificationMail(user.email, savedToken.token);

      req.flash(
        'success_msg',
        'Registeration Successful, Please verify your email'
      );
      res.redirect('/users/login');
    } catch (err) {
      console.log(err);
      res.send('Internal Server Error');
    }
  },
};
