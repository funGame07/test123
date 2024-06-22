const crypto = require('crypto')
const fs = require('fs')

function generateKey(){
    const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 4096,
        publicKeyEncoding:{
            type: 'pkcs1',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem'
        }
    })

    fs.writeFileSync('./publicKey.key', publicKey, 'utf-8')
    fs.writeFileSync('./privateKey.key', privateKey, 'utf-8')
}

generateKey()