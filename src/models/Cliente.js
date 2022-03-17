const mongoose = require('mongoose');
const ClienteSchema = require('./schemas/ClienteSchema');

module.exports = Cliente = mongoose.model('cliente', ClienteSchema)