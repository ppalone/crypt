const passport = require('passport');
const { validationResult } = require('express-validator');

module.exports = {
  getLoginForm: (req, res) => res.render('./users/login'),
  checkLoginCredentials: (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/blogs',
      failureRedirect: '/users/login',
      failureFlash: true,
    })(req, res, next);
  },
};
