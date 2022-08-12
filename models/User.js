const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = new Schema({
    login: String,
    password: String,
    profile: {
        admin: Boolean,
        default: Boolean
    },
    createdAt:{type: Date, default: Date.now}
});

const User = mongoose.model('users',userSchema);

module.exports = User;