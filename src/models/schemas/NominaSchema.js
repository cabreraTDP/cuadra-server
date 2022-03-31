const mongoose = require('mongoose');

const NominaSchema = new mongoose.Schema({
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
    detalle: {
        periodoInicio: Date,
        periodoFin: Date,
        semana: Number,
        total: Number
    },
    registros: [
        {
            trabajador: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'trabajador'
            },
            sueldoBase: {
                type: Number,
                required: true
            },
            dias: {
                type: Number,
                required: true
            },
            faltas: {
                type: Number,
                required: true
            },
            isr: {
                type: Number,
                required: true
            },
            complementos: {
                type: Number,
                default: 0
            },
            rebajes: {
                type: Number,
                default: 0
            },
            sueldoBruto:{
                type: Number,
                required: true
            },
            totalPagar: {
                type: Number,
                required: true
            },
        }
    ]
})

module.exports = NominaSchema;