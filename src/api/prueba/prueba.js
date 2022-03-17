const Cliente = require('../../models/Cliente');

////////////////////////////////////////////////////////////////////////////////////////////////////
////                                         prueba                                             ////
////////////////////////////////////////////////////////////////////////////////////////////////////

const prueba = async(req, res) => {
    console.log('Prueba');

    try {
        const { empresa } = req.body;
        const cliente = new Cliente({
            empresa
        });

        await cliente.save();

        res.status(200).json({
            cliente
        })
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}


module.exports = {
    prueba
}