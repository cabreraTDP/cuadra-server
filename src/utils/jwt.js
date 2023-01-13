const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const createJWT = (payload) => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: '300m'
    });
    return token;
};

const decodeJWT = (token) => {
    return jwt.verify(token, jwtSecret);
};

module.exports = {
    createJWT,
    decodeJWT
};