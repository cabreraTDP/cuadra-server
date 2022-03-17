const mongoose = require('mongoose');
const NominaSchema = require('./schemas/NominaSchema');

module.exports = Nomina = mongoose.model('nomina', NominaSchema)