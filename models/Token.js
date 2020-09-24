const mongoose = require('mongoose');

const TokenSchema = mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 6,
  },
});

module.exports = mongoose.model('Token', TokenSchema);
