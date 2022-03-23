const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

const connection = async() => {
    console.log('Conectando a la DB...');
    const mongodb = await mongoose.connect(uri, {

    });
    console.log('DB conectada!');
    return mongodb
}

module.exports = { connection }
