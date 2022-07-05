const Trabajador = require('../../models/Trabajador');
const {download } = require('../../utils/s3');
const {template} = require('./contrato');
const pdf = require('html-pdf');
const hbs = require('hbs');

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

const subirFotoPerfil = async(req, res) => {

    const file = req.file;
    const { idTrabajador} = req.body;

    //buscar trabajador por id
    const search = { name: idTrabajador };

    const update = { foto: file.key };

    await Trabajador.findOneAndUpdate(search, update);

    res.status(200).json({
        update
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

const downloadFile = async(req, res) => {
    console.log('Downloading');


    const {URI} = req.params;
    const document = await download(URI);
    //console.log(document.Body)
    //res.send(document)
    document.pipe(res)
    //res.redirect(document)
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
        },
        activo: true
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
    }

    const trabajador = await Trabajador.findOneAndUpdate(search, update, {new: true});

    res.status(200).json({
        msg: 'Success' ,
        trabajador
    });
}

const deleteTrabajador = async(req,res) => {
    const { cliente:idCliente } = req;
    const { idTrabajador} = req.body;

    const search = { _id: idTrabajador };
    const update = { activo: false };

    const trabajador = await Trabajador.findOneAndUpdate(search, update, {new: true});

    res.status(200).json({
        msg: 'Success' ,
        trabajador
    });
};

const getTrabajadores = async(req, res) => {
    const { cliente:idCliente } = req;

    const trabajadores = await Trabajador.find({cliente:idCliente, activo:true});

    res.status(200).json({
        data: trabajadores 
    });
};

const getTrabajador = async(req, res) => {
    const { idTrabajador} = req.body;
    const trabajador = await Trabajador.findOne({_id:idTrabajador});

    res.status(200).json({
        data: trabajador
    });
};

const crearContrato = async(req, res) => {
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
        "format": "A4",
        "border": {
            "top": "1.27cm",            
            "right": "1.27cm",
            "bottom": "1.27cm",
            "left": "1.27cm"
          },
    }
    
    pdf.create(html, config).toBuffer(function(err, buffer){
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
    getTrabajador,
    deleteTrabajador,
    subirFotoPerfil,
    uploadFile,
    downloadFile,
    crearContrato
}