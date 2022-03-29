const Cliente = require('../../models/Cliente');
const { createJWT } = require('../../utils/jwt');

////////////////////////////////////////////////////////////////////////////////////////////////////
////                                         prueba                                             ////
////////////////////////////////////////////////////////////////////////////////////////////////////

/* const prueba = async(req, res) => {
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
} */

const prueba = (req, res) => {
    console.log('Prueba exitosa');
    res.status(200).json({msg: 'Satisfactorio'})
}

const auth = async(req,res) => {
    console.log('Autenticación');
    info = {
        id: '624350ce6578baed23013d36'
    }
    try {
        const code = createJWT(info);
        res.cookie('token', code, { httpOnly: true });
        res.status(200).json({
            code: code
        })
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}


module.exports = {
    prueba,
    auth
}