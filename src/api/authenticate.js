
const { decodeJWT } = require('../utils/jwt');

module.exports = (req, res, next) => {
    const token = req.cookies.token;

    if(token){
        const info = decodeJWT(token);
        req.user = info.id;
        req.cliente = info.id;

        next();

    }else{
        return res.status(401).json({error: 'No estas autenticado'})
    }
}