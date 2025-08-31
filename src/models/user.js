const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minLength:3,
        maxLength: 20,
        required: true,
        trim: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    photoUrl: {
        type: String,
        default:"https://www.vecteezy.com/png/19879186-user-icon-on-transparent-background"
    },
    about: {
        type: String,
        default:"This is default about the user"
    },
    skills: {
        type: [String]
    }
});

module.exports = mongoose.model("User", userSchema);
