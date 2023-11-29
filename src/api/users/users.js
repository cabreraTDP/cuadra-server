const { encryptPassword, matchPassword } = require('../../utils/crypt')
const User = require('../../models/User');
const Cliente = require('../../models/Cliente');
const mongoose = require('mongoose');
const { createJWT } = require('../../utils/jwt');
const Empresa = require('../../models/Empresa')

////////////////////////////////////////////////////////////////////////////////////////////////////
////                                         prueba                                             ////
////////////////////////////////////////////////////////////////////////////////////////////////////

const prueba = (req, res) => {
    console.log('Prueba');

    res.status(200).json({
        modulo: "users"    
    })
}

const createUser = async(req, res) => {

    const {nombre, usuario, password, empresa} = req.body;

    const existingUser = await User.exists({usuario});

    if(existingUser){
        res.status(400).json({
            error: 'User already exists.' 
        });
    }else{
        const hashPassword = await encryptPassword(password);

        const cliente = await Cliente.findOne({
            empresa
        });

        if(cliente){

            const newUser = new User({
                nombre,
                usuario,
                password: hashPassword,
                cliente: cliente._id
            });

            const user = await newUser.save();

            res.status(200).json({
                user 
            });
        }else{
            res.status(400).json({
                error: 'La empresa no existe.' 
            });
        }
    }
}


const signIn = async(req, res) => {

    const {usuario, password} = req.body;

    const existingUser = await User.findOne({usuario});

    if(!existingUser){
        return res.status(400).json({
            error: 'User does not exist.' 
        });
    };
    const isPasswordCorrect = await matchPassword(password,existingUser.password);

    if(!isPasswordCorrect){
        return res.status(400).json({
            error: 'Password is incorrect.' 
        });
    };

    info = {
        id: existingUser._id,
        cliente: existingUser.cliente
    };

    const code = createJWT(info);

//.cookie('token', code, { httpOnly: true })
    res.cookie('token', code, { httpOnly: true, sameSite:'None', secure:true}).send('Cookie Set')
}

const changePassword = async(req, res) => {

    const {usuario, currentPassword, newPassword} = req.body;

    const existingUser = await User.findOne({usuario});

    if(!existingUser){
        res.status(400).json({
            error: 'User does not exist.' 
        });
    };

    if(!matchPassword(currentPassword,existingUser.password)){
        res.status(400).json({
            error: 'Wrong password' 
        });
    }

    const hashPassword = await encryptPassword(newPassword);

    existingUser.password = hashPassword;

    const updatedUser = await existingUser.save()

    res.status(200).json({
        Msg:'Success' 
    })
};

const checkUser = (req, res) => {
    res.status(200).json({
        Msg:'Success' 
    });
}

const getEmpresa = async(req, res) => {
    const { user: idUsuario, cliente: idCliente } = req;
    const empresas = await Empresa.find({ "identificacion.cliente": idCliente});
    res.status(200).json({
        data: empresas
    });
}

module.exports = {
    prueba,
    createUser,
    changePassword,
    signIn,
    checkUser,
    getEmpresa
}