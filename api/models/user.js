const mongoose = require('mongoose');

// Định nghĩa Schema cho User
const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

// Tạo model User
const User = mongoose.model('User', userSchema);

module.exports = User;