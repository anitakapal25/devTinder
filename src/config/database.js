const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://anitakapal25:dxaYDCMI5d28jZKz@cluster0.pasniow.mongodb.net/devTinder"
    );
};

module.exports = connectDB


