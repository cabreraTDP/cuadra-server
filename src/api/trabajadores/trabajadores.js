const Trabajador = require('../../models/Trabajador');
const { download, deleteFileS3 } = require('../../utils/s3');
const { template } = require('./contrato');
const pdf = require('html-pdf');
const hbs = require('hbs');
const Movimiento = require('../../models/Movimiento');
const moment = require('moment');
const Cliente = require('../../models/Cliente');

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

const subirFotoPerfil = async (req, res) => {

    const file = req.file;
    const { idTrabajador } = req.body;
    console.log('req', idTrabajador)

    //buscar trabajador por id
    const search = { _id: idTrabajador };

    const update = { foto: file.key };

    const new2 = await Trabajador.findOneAndUpdate(search, update);
    console.log(new2);

    res.status(200).json({
        update
    })
};

const uploadFile = async (req, res) => {
    console.log('Uploading');

    const file = req.file;
    const { title, idTrabajador } = req.body;

    //buscar trabajador por id
    const search = { _id: idTrabajador };

    //set documentos 
    const documento = {
        titulo: title,
        URI: file.key,
    };

    const update = { $push: { documentos: documento } };

    await Trabajador.findOneAndUpdate(search, update);

    res.status(200).json({
        documento
    })
};

const deleteFile = async (req, res) => {

    const { uri, idTrabajador } = req.body;

    //buscar trabajador por id
    const search = { _id: idTrabajador };

    const update = { $pull: { documentos: { URI: uri } } };

    const trabajador = await Trabajador.findOneAndUpdate(search, update);

    deleteFileS3(uri);

    res.status(200).json({
        trabajador
    })
};

const downloadFile = async (req, res) => {
    const { URI } = req.params;
    const document = await download(URI);

    //console.log(document.Body)
    //res.send(document)
    document.pipe(res)
    //res.redirect(document)
};

const createTrabajador = async (req, res) => {

    const { ID, nombre, apellidoMaterno, apellidoPaterno, nss, curp, rfc, estadoCivil, sexo,
        calle, numeroExterior, numeroInterior, colonia, codigoPostal, municipio, estado,
        banco, cuenta, clabe,
        puesto, sueldo, ingreso, fecha_nacimiento } = req.body;

    const { user: idUsuario, cliente: idCliente } = req;


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
            estadoCivil,
            sexo,
            fecha_nacimiento,
            direccion: {
                calle,
                numeroInterior,
                numeroExterior,
                colonia,
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
            ID,
            puesto,
            sueldo,
            ingreso
        },
        activo: true
    });

    const trabajador = await newTrabajador.save();

    const newMovimiento = new Movimiento({
        identificacion: {
            cliente: idCliente,
            usuario: idUsuario
        },
        trabajador: trabajador._id,
        movimiento: 'Alta',
        fecha: ingreso
    });

    await newMovimiento.save();

    res.status(200).json({
        trabajador
    });
}

const editTrabajador = async (req, res) => {

    const { ID, idTrabajador, nombre, apellidoMaterno, apellidoPaterno, nss, curp, rfc, estadoCivil, sexo,
        calle, numeroExterior, numeroInterior, colonia, codigoPostal, municipio, estado,
        banco, cuenta, clabe,
        puesto, sueldo, ingreso, fecha_nacimiento } = req.body;
    console.log("********dffd***", fecha_nacimiento)
    console.log('ingreso', ingreso)
    const ingresoMoment = moment(ingreso).format('YYYY-MM-DD')
    console.log('ingresoMoment', ingresoMoment)

    const { user: idUsuario, cliente: idCliente } = req;

    const search = { _id: idTrabajador };
    const update = {
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
            estadoCivil,
            sexo,
            fecha_nacimiento,
            direccion: {
                calle,
                numeroInterior,
                numeroExterior,
                colonia,
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
            ID,
            puesto,
            sueldo,
            ingreso: ingresoMoment
        }
    }

    const trabajador = await Trabajador.findOneAndUpdate(search, update, { new: true });

    console.log('trabajador', trabajador)

    res.status(200).json({
        msg: 'Success',
        trabajador
    });
}

const deleteTrabajador = async (req, res) => {
    const { cliente: idCliente, user: idUsuario, } = req;
    const { idTrabajador, fechaMovimiento } = req.body;

    const search = { _id: idTrabajador };
    const update = { activo: false };

    const trabajador = await Trabajador.findOneAndUpdate(search, update, { new: true });

    const newMovimiento = new Movimiento({
        identificacion: {
            cliente: idCliente,
            usuario: idUsuario
        },
        trabajador: idTrabajador,
        movimiento: 'Baja',
        fecha: fechaMovimiento
    });

    await newMovimiento.save();

    res.status(200).json({
        msg: 'Success',
        trabajador
    });
};

const altaTrabajador = async (req, res) => {
    const { cliente: idCliente } = req;
    const { idTrabajador, fechaMovimiento } = req.body;

    const search = { _id: idTrabajador };
    const update = { activo: true };

    const trabajador = await Trabajador.findOneAndUpdate(search, update, { new: true });

    const newMovimiento = new Movimiento({
        identificacion: {
            cliente: idCliente,
            usuario: idUsuario
        },
        trabajador: idTrabajador,
        movimiento: 'Alta',
        fecha: fechaMovimiento
    });

    await newMovimiento.save();

    res.status(200).json({
        msg: 'Success',
        trabajador
    });
};

const getTrabajadores = async (req, res) => {
    const { cliente: idCliente } = req;

    const trabajadores = await Trabajador.find({ "identificacion.cliente": idCliente, activo: true });
    console.log(trabajadores)
    res.status(200).json({
        data: trabajadores
    });
};

const getBajas = async (req, res) => {
    const { cliente: idCliente } = req;

    const trabajadores = await Trabajador.find({ "identificacion.cliente": idCliente, activo: false });

    res.status(200).json({
        data: trabajadores
    });
};

const getTrabajador = async (req, res) => {
    const { idTrabajador } = req.body;
    const idCliente = req.cliente;

    const trabajador = await Trabajador.findOne({ _id: idTrabajador });
    const cliente = await Cliente.findOne({ _id: idCliente });
    console.log(trabajador.datosPersonales)

    res.status(200).json({
        data: { trabajador, cliente }
    });
};

const crearContrato = async (req, res) => {
    const {
        patron,
        representante_legal,
        nombre_empleado,
        rfc_representante,
        direccion_representante,
        principal_actividad,
        sexo,
        fecha_nacimiento,
        nss,
        rfc,
        curp,
        direccion_empleado,
        salario_texto,
        esquema_pago,
        fecha_contrato
    } = req.body;

    const data = {
        patron,
        representante_legal,
        rfc_representante,
        direccion_representante,
        nombre_empleado,
        principal_actividad,
        sexo,
        fecha_nacimiento,
        nss,
        rfc,
        curp,
        direccion_empleado,
        salario_texto,
        esquema_pago,
        fecha_contrato
    }

    const html = await hbs.compile(template)(data);

    const config = {
        "format": "Legal",
        "border": {
            "top": "1.27cm",
            "right": "1.27cm",
            "bottom": "1.27cm",
            "left": "1.27cm"
        },
    }

    pdf.create(html, config).toBuffer(function (err, buffer) {
        res.status(200).json({
            data: buffer
        });
    });


}

module.exports = {
    prueba,
    createTrabajador,
    editTrabajador,
    getTrabajadores,
    getBajas,
    getTrabajador,
    deleteTrabajador,
    altaTrabajador,
    subirFotoPerfil,
    uploadFile,
    downloadFile,
    deleteFile,
    crearContrato
}