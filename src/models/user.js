const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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
        type: String,
        enum: {
            values:["male","female", "other"],
            message: `{VALUE} is not valid gender type`
        },
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

userSchema.methods.getJWT = async function () {
    const user = this;

    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790",{
        expiresIn: "1d"
    });

    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);

    return isPasswordValid;
}

module.exports = mongoose.model("User", userSchema);
