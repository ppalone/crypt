const User = require('../../models/User');
const Token = require('../../models/Token');
const crypto = require('crypto');
const axios = require('axios');
const sendgridService = require('../../services/sendgrid');
const { validationResult } = require('express-validator');

module.exports = {
  getRegisterForm: (req, res) => res.render('./users/register'),
  registerUser: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('./users/register', {
        error: errors.array()[0].msg,
      });
    }
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

      let response = await axios.get(URL);

      if (response.status !== 200) {
        return res.render('users/register', {
          errors: 'Bots not allowed',
        });
      }

      // Validations
      // Check if user already exists
      let existinguser = await User.findOne({ email: req.body.email });

      if (existinguser) {
        return res.render('users/register', {
          errors: 'User with this email already exists',
        });
      }

      let newuser = new User(req.body);
      let user = await newuser.save();
      let token = new Token({
        userid: user._id,
        token: crypto.randomBytes(16).toString('hex'),
      });
      let savedToken = await token.save();

      // Send the verification email to user
      let sendgridResponse = await sendgridService.sendEmailVerificationMail(
        user.email,
        savedToken.token,
      );

      // If email was sent successfully it will return 202
      if (sendgridResponse[0].statusCode !== 202) {
        // Error with sendgrid service
        // Remove the newly created user and token
        await User.findByIdAndRemove({ _id: user._id });
        await Token.findByIdAndRemove({ _id: savedToken._id });
        return res.render('users/register', {
          errors: 'Something wrong with the server please try later',
        });
      }

      req.flash(
        'success_msg',
        'Registeration Successful, Please verify your email in your inbox',
      );
      res.redirect('/users/login');
    } catch (err) {
      console.log(err);
      res.send('Internal Server Error');
    }
  },
};
