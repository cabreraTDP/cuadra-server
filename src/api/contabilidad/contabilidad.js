const {Ingresos} = require('../../utils/algorithms');
const {PDFtoArray} = require('../../utils/extras');
const Operacion = require('../../models/Operacion');

const prueba = (req, res) => {
    console.log('Prueba');

    res.status(200).json({
        modulo: "nominas"
    })
};

const crearOperacion = async(req,res) => {
    const { user:idUsuario, cliente:idCliente } = req;

    const {titulo, descripcion, monto, tipo, categoria, fechaOperacion} = req.body;

    const newOperacion = new Operacion({
        identificacion: {
            cliente: idCliente,
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

const getOperaciones = async(req,res) => {
    const { cliente:idCliente } = req;

    const operaciones = await Operacion.find({cliente:idCliente});

    res.status(200).json({
        data: operaciones
    });
};

const uploadPDF = async(req,res) => {
    const { user:idUsuario, cliente:idCliente } = req;

    //Get File
    const {file} = req.files;

    const texto = await PDFtoArray(file);

    const resultado = Ingresos(texto);

    const operaciones = resultado.map((operacion) => ({
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
    }));

    const guardado = await Operacion.insertMany(operaciones);

    res.status(200).json({
        data: guardado
    })
}

module.exports = {
    prueba,
    uploadPDF,
    crearOperacion,
    editarOperacion,
    getOperaciones
}