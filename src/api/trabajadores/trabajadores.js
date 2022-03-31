const Trabajador = require('../../models/Trabajador');

////////////////////////////////////////////////////////////////////////////////////////////////////
////                                         prueba                                             ////
////////////////////////////////////////////////////////////////////////////////////////////////////

const prueba = (req, res) => {
    console.log('Prueba');

    res.status(200).json({
        modulo: "trabajadores"
    })
};

const createTrabajador = async(req, res) => {

    const {nombre, apellidoMaterno, apellidoPaterno, nss, curp,
           calle, numeroExterior, numeroInterior, codigoPostal, municipio, estado,
           banco, cuenta, clabe,
           puesto, sueldo, ingreso} = req.body;

    const { user:idUsuario, cliente:idCliente } = req;

    console.log(req.user)

    console.log(idCliente, idUsuario)

    const newTrabajador = new Trabajador({
        identificacion: {
            cliente: idCliente,
            usuario: idUsuario
        },
        datosPersonales: {
            nombre,
            apellidoMaterno,
            apellidoPaterno,
            nss,
            curp,
            direccion: {
                calle,
                numeroInterior,
                numeroExterior,
                codigoPostal,
                municipio,
                estado
            }
        },
        datosBancarios: {
            banco,
            cuenta,
            clabe
        },
        datosLaborales: {
            puesto,
            sueldo,
            ingreso
        }
    })

    const trabajador = await newTrabajador.save();

    res.status(200).json({
        trabajador 
    });
}

const editTrabajador = async(req, res) => {

    const {idTrabajador, nombre, apellidoMaterno, apellidoPaterno, nss, curp,
           calle, numeroExterior, numeroInterior, codigoPostal, municipio, estado,
           banco, cuenta, clabe,
           puesto, sueldo, ingreso} = req.body;

    const { user:idUsuario, cliente:idCliente } = req;

    const trabajadorExists = Trabajador.findOne({
        _id: idTrabajador
    })

    if(!trabajadorExists){
        res.status(200).json({
            error: 'Trabajador does not exist' 
        });
    }

    const updateTrabajador = new Trabajador({
        identificacion: {
            cliente: idCliente,
            usuario: idUsuario
        },
        datosPersonales: {
            nombre,
            apellidoMaterno,
            apellidoPaterno,
            nss,
            curp,
            direccion: {
                calle,
                numeroInterior,
                numeroExterior,
                codigoPostal,
                municipio,
                estado
            }
        },
        datosBancarios: {
            banco,
            cuenta,
            clabe
        },
        datosLaborales: {
            puesto,
            sueldo,
            ingreso
        }
    })

    trabajadorExists = updateTrabajador;

    await trabajadorExists.save();

    res.status(200).json({
        msg: 'Success' 
    });
}

const getTrabajadores = async(req, res) => {
    const { cliente:idCliente } = req;

    const trabajadores = await Trabajador.find({cliente:idCliente});

    res.status(200).json({
        data: trabajadores 
    });
}

module.exports = {
    prueba,
    createTrabajador,
    editTrabajador,
    getTrabajadores
}