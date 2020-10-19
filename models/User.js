const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

// Hash Password before saving
// Note: arrow functions doesn't work in mongoose hooks cuz arrow function interpret 'this' in different way
// Stackoverflow: https://stackoverflow.com/questions/51224695/pre-hooks-in-mongoose-model-as-es6-class
UserSchema.pre('save', async function (next) {
  try {
    // this points to the user
    let user = this;

    // If the password is not modified
    if (!user.isModified('password')) return next();

    let salt = await bcrypt.genSalt(SALT_FACTOR);
    let hash = await bcrypt.hash(user.password, salt);

    // Set the hashed password as user's password
    user.password = hash;
    next();
  } catch (err) {
    // Forward error
    next(err);
  }
});

// Add custom method to user schema
UserSchema.methods.comparePassword = async function (password, callback) {
  try {
    // password - recieved from function
    // this.password - user's current password
    let isMatch = await bcrypt.compare(password, this.password);
    callback(null, isMatch);
  } catch (err) {
    callback(err);
  }
};

module.exports = mongoose.model('User', UserSchema);
