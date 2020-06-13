const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    // const user = this;
    // console.log(this);
    // next();

    bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});

/**
 * Add method to user schema
 */
userSchema.methods.comparePassword = function (password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) callback(err);
        callback(null, isMatch);
    });
};


module.exports = mongoose.model('User', userSchema);