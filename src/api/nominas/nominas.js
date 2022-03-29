const Nomina = require('../../models/Nomina');
const Trabajador = require('../../models/Trabajador');

const prueba = (req, res) => {
    console.log('Prueba');

    res.status(200).json({
        modulo: "nominas"
    })
};

const createNomina = (req, res) => {

    const {
        periodoInicio, periodoFin, semana,
        operaciones
    } = req.body;

    const { user:idUsuario, cliente:idCliente } = req;


    //operaciones es un array
    const registros = operaciones.map((operacion) => (
        {
            trabajador: operacion.trabajador,
            sueldoBase: operacion.sueldoBase,
            dias: operacion.dias,
            complementos: operacion.complementos,
            rebajes: operacion.rebajes,
            isr: (operacion.sueldoBase*operacion.dias)*0.1,
            totalPagar: (operacion.sueldoBase*operacion.dias)+operacion.complementos-operacion.rebajes-(operacion.sueldoBase*operacion.dias)*0.1 //ISR
        }
    ));

    const newNomina = new Nomina({
        identificacion: {
            cliente: idCliente,
            usuario: idUsuario
        },
        detalle: {
            periodoInicio,
            periodoFin,
            semana
        },
        registros
    });

    await newNomina.save()

    res.status(200).json({
        msg: "Success"
    })
};

const getNominabyCliente = (req, res) => {

    const { user:idUsuario, cliente:idCliente } = req;

    const nominas = Nomina.find({cliente: idCliente})

    res.status(200).json({
        data: nominas
    })
};

module.exports = {
    prueba,
    createNomina,
    getNominabyCliente
}