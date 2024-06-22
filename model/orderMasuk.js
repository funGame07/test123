const mongoose = require('mongoose')

const orderMasukSchema = new mongoose.Schema({
    NPB: {
        type: String,
        required: true
    },
    namaBarang: {
        type: String,
        required: true
    },
    kodeBarang: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    tanggal: {
        type: Date,
        required: true
    },
    namaSupplier: {
        type: String,
        required: true
    },
    selesai: Boolean
})

const orderMasuk = mongoose.model('OrderMasuk', orderMasukSchema)

module.exports = orderMasuk