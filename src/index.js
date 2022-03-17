const expres = require('express');

const app = expres();


const port = process.env.PORT || 7799;

app.use('/prueba', require('./api/prueba/routes'))
app.use('/trabajadores', require('./api/trabajadores/routes'))
app.use('/nominas', require('./api/nominas/routes'))
app.use('/users', require('./api/users/routes'))



app.listen(port, () => {
    console.log('Server started on port', port);
})