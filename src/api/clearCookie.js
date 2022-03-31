
module.exports = (req, res, next) => {
    console.log('cleaning')
    res.clearCookie('token', { httpOnly: true})
    next()
}