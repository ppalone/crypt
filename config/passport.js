const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          let user = await User.findOne({ email: email });
          if (!user) {
            return done(null, false, {
              message: 'This Email is not registered',
            });
          }
          user.comparePassword(password, function (err, isMatch) {
            if (err) return done(err);
            if (!isMatch)
              return done(null, false, {
                message: 'Password is incorrect!',
              });
            if (!user.isVerified)
              return done(null, false, {
                message: 'Please verify your email',
              });
            return done(null, user);
          });
        } catch (err) {
          console.log(err);
        }
      },
    ),
  );
  /*
   * Serialize and deserialize user
   */
  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
