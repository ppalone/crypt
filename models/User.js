const mongoose = require('mongoose');
const Blog = require('./Blog');

const userSchema = mongoose.Schema(
    {
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
    }
);

module.exports = mongoose.model('User', userSchema);