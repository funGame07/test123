const mongoose = require('mongoose')

const orderKeluarSchema = new mongoose.Schema({
    BPB: {
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
    namaPenerima: {
        type: String,
        required: true
    },
    selesai: Boolean
})

const orderKeluar = mongoose.model('OrderKeluar', orderKeluarSchema)

module.exports = orderKeluar