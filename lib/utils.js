const bcrypt = require('bcrypt')
const {verifyToken} = require('../lib/jwt')
require('dotenv').config()

function hashPassword(password){
    const salt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, salt)
    return hashedPassword
}

function validatePassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
}

function isAuth(req, res,next){
    const jwtCookie = req.cookies?.jwt
    if(!jwtCookie) return res.json({
        success: false,
        message: 'not authenticated'
    })
    const isValidToken = verifyToken(jwtCookie)
    if(isValidToken) next()
}

function checkToken(token){
    const realToken = process.env.TOKEN
    return token === realToken ? true : false
}

module.exports = {
    hashPassword,
    validatePassword,
    isAuth,
    checkToken
}