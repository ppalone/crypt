const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Blog = require('./Blog');
const SALT_FACTOR = 10;

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      },
    ],
    expireAt: {
      type: Date,
      default: Date.now,
      expires: 60 * 60 * 6,
    },
    passwordResetToken: {
      type: String,
      default: '',
    },
    passwordTokenExpiry: {
      type: Date,
    },
  },
  { timestamps: true },
);

/**
 * Hash password before saving
 */
UserSchema.pre('save', function (next) {
  let user = this;

  // Password Incorrect issue resolved using this line
  if (!user.isModified('password')) return next();

  bcrypt
    .genSalt(SALT_FACTOR)
    .then((salt) => {
      bcrypt
        .hash(user.password, salt)
        .then((hash) => {
          user.password = hash;
          next();
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
});

/**
 * Add method to user schema
 */
UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt
    .compare(password, this.password)
    .then((isMatch) => {
      callback(null, isMatch);
    })
    .catch((err) => callback(err));
};

module.exports = mongoose.model('User', UserSchema);
