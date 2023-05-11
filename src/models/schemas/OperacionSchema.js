const mongoose = require('mongoose');

const OperacionSchema = new mongoose.Schema({
    identificacion: {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cliente'
        },
        empresa: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'empresa'
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    tipo: String,
    categoria: String,
    titulo: String,
    descripcion: String,
    monto: Number,
    fechaOperacion: Date,
})

module.exports = OperacionSchema;