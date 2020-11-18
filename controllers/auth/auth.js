const passport = require('passport');
const crypto = require('crypto');
const axios = require('axios');
const { validationResult } = require('express-validator');

const User = require('../../models/User');
const Token = require('../../models/Token');

const sendgridService = require('../../services/sendgrid');

const getLoginForm = (req, res) => res.render('./users/login');

const checkLoginCredentials = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/blogs',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};

const getRegisterForm = (req, res) => res.render('./users/register');

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('./users/register', {
        error: errors.array()[0].msg,
      });
    }

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

    // Generate a hexadecimal string of length 16
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
    res.redirect('/login');
  } catch (err) {
    console.log(err);
    res.send('Internal Server Error');
  }
};

const logout = (req, res) => {
  req.flash('success_mss', 'Logged out successfully!');
  req.logout();
  res.redirect('/login');
};

module.exports = {
  getLoginForm,
  checkLoginCredentials,
  getRegisterForm,
  registerUser,
  logout,
};
