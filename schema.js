const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    dob: Date,
    zip: Number
});

const User = mongoose.model('User', userSchema);

exports.User = User;