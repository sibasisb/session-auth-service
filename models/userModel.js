const UserSchema = require('../schema/UserSchema');
const mongoose = require('mongoose');
const userModel = mongoose.model('User', UserSchema);

module.exports = userModel;
