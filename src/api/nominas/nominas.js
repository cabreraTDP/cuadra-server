const Nomina = require('../../models/Nomina');
const Operacion = require('../../models/Operacion');
const Trabajador = require('../../models/Trabajador');
const {getWeek, calcularISR, sumarArray} = require('../../utils/extras')
const moment = require('moment')
const diasNaturales = {
    'Semana': 7,
    'Quincena': 15
}

const diasLaborados = (diastotales, faltas) => diastotales-faltas

const prueba = (req, res) => {
    console.log('Prueba');

    res.status(200).json({
        modulo: "nominas"
    })
};

const createNomina = async(req, res) => {

    const {
        detalle,
        operaciones
    } = req.body;

    const { user:idUsuario, cliente:idCliente } = req;

    detalle['periodoInicio'] = new Date(detalle.periodoInicio);
    detalle['periodoFin'] = new Date(detalle.periodoFin);

    const semananomina = getWeek(detalle.periodoInicio)-1

    detalle['semana'] = semananomina;

    const {esquema} = detalle

    const diasTotales = diasNaturales[esquema];

    const registros = operaciones.map((operacion) => {
        let dias = diasLaborados(diasTotales,operacion.dias);
        let isr = calcularISR(operacion.sueldoBase*dias,esquema);
        let sueldoBruto = operacion.sueldoBase*dias;
        return ({
            trabajador: operacion.trabajador,
            sueldoBase: operacion.sueldoBase,
            dias: dias,
            faltas: operacion.dias,
            complementos: operacion.complementos,
            rebajes: operacion.rebajes,
            isr: isr,
            sueldoBruto: sueldoBruto,
            totalPagar: sueldoBruto+operacion.complementos-operacion.rebajes-isr //ISR
        })
    });

    const total = sumarArray(registros.map(registro => registro.totalPagar));

    detalle['total'] = total;

    const newNomina = new Nomina({
        identificacion: {
            cliente: idCliente,
            usuario: idUsuario
        },
        detalle,
        registros
    });

    await newNomina.save();

    const newOperacion = new Operacion({
        identificacion: {
            cliente: idCliente,
            usuario: idUsuario
        },
        tipo:'Gasto',
        categoria:'Sueldos',
        titulo:'Pago de Nomina',
        descripcion: `Nomina del ${moment(detalle.periodoInicio).format('DD-MM')} al ${moment(detalle.periodoFin).format('DD-MM')}`,
        monto: detalle.total,
        fechaOperacion: Date.now()
    })

    await newOperacion.save();

    res.status(200).json({
        msg: "Success"
    })
};

const getNominabyCliente = async(req, res) => {

    const { user:idUsuario, cliente:idCliente } = req;

    const nominas = await Nomina.find({cliente: idCliente})
    

    res.status(200).json({
        data: nominas
    })
};

const getNominaById = async(req, res) => {

    const { user:idUsuario, cliente:idCliente } = req;
    const {id} = req.body

    const nominas = await Nomina.find({_id: id}).populate('registros.trabajador')
    

    res.status(200).json({
        data: nominas
    })
};


module.exports = {
    prueba,
    createNomina,
    getNominabyCliente,
    getNominaById
}