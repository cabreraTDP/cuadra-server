const Nomina = require('../../models/Nomina');
const Operacion = require('../../models/Operacion');
const Trabajador = require('../../models/Trabajador');
const {getWeek, calcularISR, sumarArray, calcularSubsidio} = require('../../utils/extras')
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
        operaciones,
        empresa: idEmpresa 
    } = req.body;

    const { user:idUsuario, cliente:idCliente } = req;

    detalle['periodoInicio'] = new Date(detalle.periodoInicio);
    detalle['periodoFin'] = new Date(detalle.periodoFin);

    const semananomina = getWeek(detalle.periodoInicio)-1

    detalle['semana'] = semananomina;

    detalle.esquema ? esquema = detalle.esquema : esquema = 'Semana'

    const diasTotales = diasNaturales[esquema];

    const registros = operaciones.map((operacion) => {
        let dias = diasLaborados(diasTotales,operacion.Faltas);
        let isr = calcularISR(operacion.sueldoBase*dias,esquema);
        let sueldoBruto = operacion.sueldoBase*dias;
        let extras = [];
        let subsidio = calcularSubsidio(operacion.sueldoBase*dias,esquema)
        if(operacion["Horas Extras"])extras.push({"Horas Extras":operacion["Horas Extras"]*operacion.sueldoBase})
        if(operacion["Domingos Trabajados"])extras.push({"Domingos Trabajados": primaDominical(operacion["Domingos Trabajados"])})

        return ({
            trabajador: operacion.trabajador,
            sueldoBase: operacion.sueldoBase,
            dias: dias,
            faltas: operacion.Faltas,
            complementos: operacion.Complementos,
            rebajes: operacion.Rebajes,
            isr: isr,
            sueldoBruto: sueldoBruto,
            extras,
            totalPagar: sueldoBruto+operacion.Complementos-operacion.Rebajes-isr+subsidio //ISR
        })
    });

    const total = sumarArray(registros.map(registro => registro.totalPagar));

    detalle['total'] = total;

    const newNomina = new Nomina({
        identificacion: {
            cliente: idCliente,
            empresa: idEmpresa,
            usuario: idUsuario
        },
        detalle,
        registros
    });

    await newNomina.save();

    const newOperacion = new Operacion({
        identificacion: {
            cliente: idCliente,
            empresa: idEmpresa,
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

    const nominas = await Nomina.find({"identificacion.cliente": idCliente})
    

    res.status(200).json({
        data: nominas
    })
};

const getNominabyEmpresa = async(req, res) => {

    const { user:idUsuario, cliente:idCliente } = req;
    const { empresa: idEmpresa } = req.body;

    const nominas = await Nomina.find({"identificacion.cliente": idCliente, "identificacion.empresa": idEmpresa})
    

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

const crearFiniquito = async(req, res) => {

    let { sueldoDiario, fechaIngreso, ultimoDiaPago, otros } = req.body;
    otros = parseInt(otros)
    fechaIngreso = new Date(fechaIngreso);
    ultimoDiaPago = new Date(ultimoDiaPago);
    sueldoDiario = parseInt(sueldoDiario)
    const hoy = Date.now()
    const endYear = new Date('12/31/2022')
    let diasTrabajados = Math.ceil( Math.abs(ultimoDiaPago - fechaIngreso) / (1000 * 60 * 60 * 24)); 
    if(diasTrabajados>365){
        diasTrabajados = 365
    }

    const diasFaltantesPago = Math.ceil( Math.abs(hoy - ultimoDiaPago) / (1000 * 60 * 60 * 24)); 
    const aguinaldo = ((sueldoDiario*15)/365)*(diasTrabajados)
    const diasFaltantesYear = Math.ceil( Math.abs(endYear - hoy) / (1000 * 60 * 60 * 24)); 
    const vacaciones = (6*sueldoDiario/365)*diasTrabajados
    const primaVacacional = vacaciones*0.25

    const totalPagar = (diasFaltantesPago*sueldoDiario) + aguinaldo + vacaciones + primaVacacional + otros

    const resultado = {
        "pendiente": (diasFaltantesPago*sueldoDiario).toFixed(2),
        "aguinaldo": aguinaldo.toFixed(2),
        "vacaciones": vacaciones.toFixed(2),
        "primaVacacional": primaVacacional.toFixed(2),
        "otros": otros.toFixed(2),
        "total": totalPagar.toFixed(2)
    }


    res.status(200).json({
        resultado
    })
}


module.exports = {
    prueba,
    createNomina,
    getNominabyCliente,
    getNominaById,
    crearFiniquito,
    getNominabyEmpresa
}