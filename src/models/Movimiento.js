const mongoose = require('mongoose');
const MovimientoSchema = require('./schemas/MovimientoSchema');

module.exports = Movimiento = mongoose.model('movimiento', MovimientoSchema)