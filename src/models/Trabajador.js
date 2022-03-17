const mongoose = require('mongoose');
const TrabajadorSchema = require('./schemas/TrabajadorSchema');

module.exports = Trabajador = mongoose.model('trabajador', TrabajadorSchema)