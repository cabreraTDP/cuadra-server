const mongoose = require('mongoose');

const EmpresaSchema = new mongoose.Schema({
    identificacion: {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cliente'
    }},
    empresa: {
        type: String,
        required: true
    },
    representante_legal: {
        type: String,
        required: true
    },
    direccion_representante: {
        type: String,
        required: true
    },
    rfc_representante: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
})

module.exports = EmpresaSchema;