const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    // console.log('Is is ever triggered?');
                    if (!user) return done(null, false, { message: "This Email is not registered" });
                    
                    /*
                     * If user is found check password    
                     */
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        // Handle error
                        if (err) throw err;

                        if (isMatch) return done(null, user);
                        else return done(null, false, { message: "Password is incorrect" });
                    })
                })
                .catch(err => console.log(err)); 
        })
    );
    /*
    * Serialize and deserialize user
    */
    passport.serializeUser((user, done) => done(null, user.id));
    
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user));
    });
}

