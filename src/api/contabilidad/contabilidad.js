const {Ingresos, Impuestos, IMSS} = require('../../utils/algorithms');
const {PDFtoArray} = require('../../utils/extras');
const Operacion = require('../../models/Operacion');

const constante = {
    "emitida": (texto, idCliente, idUsuario) => Ingresos(texto).map((operacion) => ({
                    identificacion: {
                        cliente: idCliente,
                        usuario: idUsuario
                    },
                    tipo: operacion.tipo,
                    categoria: 'Ventas',
                    titulo: 'SAT',
                    descripcion: `Emitida para: ${operacion.receptor}`,
                    monto: operacion.total.replace('$','').replace(',',''),
                    fechaOperacion: operacion.fecha
                })),
    "recibida": (texto, idCliente, idUsuario) => Ingresos(texto).map((operacion) => ({
                    identificacion: {
                        cliente: idCliente,
                        usuario: idUsuario
                    },
                    tipo: operacion.tipo,
                    categoria: 'Ventas',
                    titulo: 'SAT',
                    descripcion: `Emitida para: ${operacion.receptor}`,
                    monto: operacion.total.replace('$','').replace(',',''),
                    fechaOperacion: operacion.fecha
                })),
    "impuestos": (texto, idCliente, idUsuario) => Impuestos(texto).map((operacion) => ({
                    identificacion: {
                        cliente: idCliente,
                        usuario: idUsuario
                    },
                    tipo: operacion.tipo,
                    categoria: 'Impuestos',
                    titulo: 'SAT',
                    descripcion: operacion.descripcion,
                    monto: operacion.total,
                    fechaOperacion: operacion.fecha
                })),
    "social": (texto, idCliente, idUsuario) => IMSS(texto).map((operacion) => ({
                    identificacion: {
                        cliente: idCliente,
                        usuario: idUsuario
                    },
                    tipo: "Gasto",
                    categoria: 'Impuestos',
                    titulo: 'SAT',
                    descripcion: operacion.nombrearchivo,
                    monto: operacion.dato,
                    fechaOperacion: operacion.fecha
    }))
}

const prueba = (req, res) => {
    console.log('Prueba');

    res.status(200).json({
        modulo: "nominas"
    })
};

const crearOperacion = async(req,res) => {
    const { user:idUsuario, cliente:idCliente} = req;

    const {titulo, descripcion, monto, tipo, categoria, fechaOperacion, empresa: idEmpresa } = req.body;

    const newOperacion = new Operacion({
        identificacion: {
            cliente: idCliente,
            empresa: idEmpresa,
            usuario: idUsuario
        },
        tipo,
        categoria,
        titulo,
        descripcion,
        monto,
        fechaOperacion
    });

    const operacion = await newOperacion.save();

    res.status(200).json({
        data: operacion 
    });
};

const editarOperacion = async(req,res) => {

    const {_id:id, titulo, descripcion, monto, tipo, categoria, fechaOperacion} = req.body;

    const updatedOperacion = {
        tipo,
        categoria,
        titulo,
        descripcion,
        monto,
        fechaOperacion
    };

    const operacion = await Operacion.findByIdAndUpdate(id,updatedOperacion);
    
    res.status(200).json({
        data: operacion 
    });
};

const eliminarOperacion = async(req,res) => {
    const { user:idUsuario, cliente:idCliente } = req;
    const {id} = req.body;

    const eliminar = await Operacion.findByIdAndDelete(id);

    res.status(200).json({
        data: eliminar 
    });

}

const getOperaciones = async(req,res) => {
    const { cliente:idCliente } = req;

    const operaciones = await Operacion.find({"identificacion.cliente":idCliente});

    res.status(200).json({
        data: operaciones
    });
};

const getOperacionesByEmpresa = async(req,res) => {
    const { cliente:idCliente} = req;
    const {empresa: idEmpresa } = req.body;
    const operaciones = await Operacion.find({"identificacion.cliente":idCliente, "identificacion.emrpesa":idEmpresa, });

    res.status(200).json({
        data: operaciones
    });
};

const uploadPDF = async(req,res) => {
    const { user:idUsuario, cliente:idCliente } = req;
    const {tipo} = req.body;

    //Get File
    const {file} = req.files;

    const texto = await PDFtoArray(file);

    const operaciones = constante[tipo]
    console.log(tipo)
    const operaciones_resultado = operaciones(texto,idCliente,idUsuario);

    const guardado = await Operacion.insertMany(operaciones_resultado);

    res.status(200).json({
        data: guardado
    })
}

module.exports = {
    prueba,
    uploadPDF,
    crearOperacion,
    editarOperacion,
    eliminarOperacion,
    getOperaciones,
    getOperacionesByEmpresa
}