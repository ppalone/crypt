const passport = require('passport');
const { validationResult } = require('express-validator');

module.exports = {
  getLoginForm: (req, res) => res.render('./users/login'),
  checkLoginCredentials: (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render('./users/login', {
        error: errors.array()[0].msg,
      });
    }

    passport.authenticate('local', {
      successRedirect: '/blogs',
      failureRedirect: '/users/login',
      failureFlash: true,
    })(req, res, next);
  },
};
