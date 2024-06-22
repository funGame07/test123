const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    img: String,
    kodeBarang: {
        type: String,
        required: true,
        unique: true
    },
    namaBarang: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    gudang: {
        type: String,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product