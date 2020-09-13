const passport = require('passport');

module.exports = {
    getLoginForm: (req, res) => res.render('./users/login'),
    checkLoginCredentials: (req, res, next) => {
        passport.authenticate('local', {
            successRedirect: '/blogs',
            failureRedirect: '/users/login',
            failureFlash: true
        })(req, res, next);  
    }
}