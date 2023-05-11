const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    empresas: [{
        empresa: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'empresa'
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = ClienteSchema;