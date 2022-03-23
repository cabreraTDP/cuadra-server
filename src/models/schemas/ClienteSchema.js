const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    empresa: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
})

module.exports = ClienteSchema;