const User = require('../../models/User');
const Token = require('../../models/Token');
const crypto = require('crypto');
const axios = require('axios');
const sendgridService = require('../../services/sendgrid');

module.exports = {
  getRegisterForm: (req, res) => res.render('./users/register'),
  registerUser: async (req, res) => {
    try {
      // TODO: validations on req.body
      // Check if the user have filled the captcha
      if (
        req.body['g-recaptcha-response'] === undefined ||
        req.body['g-recaptcha-response'] === null ||
        req.body['g-recaptcha-response'] === ''
      ) {
        return res.render('users/register', {
          errors: 'Please select the captcha',
        });
      }

      let URL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${req.body['g-recaptcha-response']}&remoteip=${req.connection.remoteAddress}`;

      let response = await axios.get(URL)

      if (response.status !== 200) {
        return res.render('users/register', { errors: 'Bots not allowed' })
      }

      // Validations
      // Check if user already exists
      let existinguser = await User.findOne({ email: req.body.email })

      if (existinguser) {
        return res.render('users/register', { errors: 'User with this email already exists' });
      }

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
        'Registeration Successful, Please verify your email in your inbox'
      );
      res.redirect('/users/login');
    } catch (err) {
      console.log(err);
      res.send('Internal Server Error');
    }
  },
};
