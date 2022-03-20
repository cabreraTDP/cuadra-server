const express = require('express');
const { MongoClient } = require('mongodb');
const cookieParser = require('cookie-parser')

require('dotenv').config('./');


const app = express();
const db = require('./utils/database');

const port = process.env.PORT || 7799;

app.unsubscribe(express.static('public'));
app.use(express.json({ extended: false}));
app.use(cookieParser());


app.use('/prueba', require('./api/prueba/routes'))
app.use('/trabajadores', require('./api/trabajadores/routes'))
app.use('/nominas', require('./api/nominas/routes'))
app.use('/users', require('./api/users/routes'))


db.connection().then(mongo => {
    app.listen(port, () => {
        console.log('Server started on port', port);
    })
}).catch(err => {
    console.error(err);
})
