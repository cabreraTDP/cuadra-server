const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = ClienteSchema;