const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_FACTOR = 10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    blogs: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Blog'
        }
    ]
});

/**
 * Hash password before saving
 */
userSchema.pre('save', function (next) {
    let user = this;

    // Password Incorrect issue resolved using this line
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_FACTOR)
        .then(salt => {
            bcrypt.hash(user.password, salt)
                .then(hash => {
                    user.password = hash;
                    next()
                })
                .catch(err => next(err));
        })
        .catch(err => next(err));
});

/**
 * Add method to user schema
 */
userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password)
        .then(isMatch => {
            callback(null, isMatch);
        })
        .catch(err => callback(err))
};


module.exports = mongoose.model('User', userSchema);