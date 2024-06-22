const jwt = require('jsonwebtoken')

const path = require('path')
const fs = require('fs')

const privateKey = fs.readFileSync(path.join(__dirname, '..', 'secret', 'privateKey.key'))
const publicKey = fs.readFileSync(path.join(__dirname, '..', 'secret', 'publicKey.key'))

function issueToken(user){
    const payload = {
        id: user.id
    }
    const expires = '15h'
    const token = jwt.sign(payload, privateKey, {expiresIn: expires, algorithm: 'RS256'})
    return token
}

function verifyToken(token){
    const info = jwt.verify(token, publicKey, {algorithms: ['RS256']}, (err, decoded) =>{
        if(err) return false
        if(decoded) return decoded
    })
    return info
}
    

module.exports = {
    issueToken,
    verifyToken
}