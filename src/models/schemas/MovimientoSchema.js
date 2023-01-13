const mongoose = require('mongoose');

const MovimientoSchema = new mongoose.Schema({
    identificacion: {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cliente'
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
    trabajador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'trabajador',
        required: true
    },
    movimiento: {
        type: String,
        required: true
    }
});

module.exports = MovimientoSchema;