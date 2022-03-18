const { ObjectId } = require('bson');
const jwt = require('jsonwebtoken');
const { decodeJWT } = require('../utils/jwt');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    console.log(token)
    if(token){
        const info = decodeJWT(token);
        req.userId = info.id;
        next();

    }else{
        return res.status(401).json({error: 'No estas autenticado'})
    }
}