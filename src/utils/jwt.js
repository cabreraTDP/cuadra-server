const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

const createJWT = async(payload) => {
    const token = jwt.sign(payload, jwtSecret, {
        expiresIn: 20
    });
    return token;
};

const decodeJWT = async (token) => {
    return jwt.verify(token, jwtSecret);
};

module.exports = {
    createJWT,
    decodeJWT
};