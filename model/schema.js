const mongoose = require('mongoose')
const {hashPassword} = require('../lib/utils')

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

schema.pre('save', function(next){
    const hash = hashPassword(this.password)
    this.password = hash
    next()
})

const Admin = mongoose.model('Admin', schema)

module.exports = Admin