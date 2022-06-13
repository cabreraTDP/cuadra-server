const mongoose = require('mongoose');
const OperacionSchema = require('./schemas/OperacionSchema');

module.exports = Operacion = mongoose.model('operacion', OperacionSchema)