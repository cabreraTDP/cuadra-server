
module.exports = (req, res, next) => {
    res.clearCookie('token', { httpOnly: true})
    next()
}