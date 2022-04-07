const Trabajador = require('../../models/Trabajador');
const {download } = require('../../utils/s3')

////////////////////////////////////////////////////////////////////////////////////////////////////
////                                         prueba                                             ////
////////////////////////////////////////////////////////////////////////////////////////////////////

const prueba = (req, res) => {
    console.log('Prueba');
    /* multiple files
    const file = req.files;
    const pdf = file.file[0];
    const images = file.images[0];
     */
    //single file


    res.status(200).json({
        modulo: "trabajadores",
    })
};

const uploadFile = async(req, res) => {
    console.log('Uploading');

    const file = req.file;
    const {title, idTrabajador} = req.body;

    //buscar trabajador por id
    const search = { name: idTrabajador };

    //set documentos 
    const documento = {
        titulo: title,
        URI: file.key,
    };

    const update = { $push: { documentos: documento  } };

    await Trabajador.findOneAndUpdate(search, update);

    res.status(200).json({
        documento
    })
};


const createTrabajador = async(req, res) => {

    const {nombre, apellidoMaterno, apellidoPaterno, nss, curp, rfc,
           calle, numeroExterior, numeroInterior, codigoPostal, municipio, estado,
           banco, cuenta, clabe,
           puesto, sueldo, ingreso} = req.body;

    const { user:idUsuario, cliente:idCliente } = req;


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
            rfc,
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

    const {idTrabajador, nombre, apellidoMaterno, apellidoPaterno, nss, curp, rfc,
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
            rfc,
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
    getTrabajadores,
    uploadFile
}