const mongoose = require('mongoose');
const EmpresaSchema = require('./schemas/EmpresaSchema');

module.exports = Empresa = mongoose.model('empresa', EmpresaSchema)