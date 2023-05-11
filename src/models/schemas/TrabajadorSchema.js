const mongoose = require('mongoose');

const TrabajadorSchema = new mongoose.Schema({
    identificacion: {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'cliente'
        },
        empresa: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'empresa'
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    },
    datosPersonales: {
        nombre: String,
        apellidoMaterno: String,
        apellidoPaterno: String,
        nss: String,
        curp: String,
        rfc: String,
        estadoCivil: String,
        sexo: String,
        fecha_nacimiento: Date,
        direccion: {
            calle: String,
            numeroInterior: String,
            numeroExterior: String,
            codigoPostal: String,
            colonia: String,
            municipio: String,
            estado: String
        }
    },
    datosBancarios: {
        banco: String,
        cuenta: String,
        clabe: String
    },
    datosLaborales: {
        ID: String,
        puesto: String,
        sueldo: String,
        ingreso: Date
    },
    documentos: [
        {
            titulo: String,
            URI: String,
            createdAt: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    activo: {
        type: Boolean,
        required: true
    },
    foto: {
        type: String
    }

})

module.exports = TrabajadorSchema;