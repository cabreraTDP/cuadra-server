const mongoose = require('mongoose');
const UserSchema = require('./schemas/UserSchema');

module.exports = User = mongoose.model('user', UserSchema)