const mongoose = require('mongoose');
const ClienteSchema = require('./schemas/ClienteSchema');

module.exports = ClienteSchema = mongoose.model('cliente', ClienteSchema)