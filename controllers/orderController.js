const OrderMasuk = require('../model/orderMasuk')
const OrderKeluar = require('../model/orderKeluar')
const Product = require('../model/productSchema')

async function orderMasuk(req, res){
    const orderM = await OrderMasuk.find().lean()
    return res.json({
        orderMasuk: orderM
    })
}

async function postMasuk(req, res){
    const {NPB, namaBarang, kodeBarang, quantity, tanggal, namaSupplier} = req.body
    try{
        const newOrderMasuk = OrderMasuk({
            NPB,
            namaBarang,
            kodeBarang, 
            quantity,
            tanggal,
            namaSupplier,
            selesai: false
        })
        await newOrderMasuk.save()
        return res.json({
            success: true
        })
    }catch(err){
        if(err) return res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function updateMasuk(req, res){
    const {_id} = req.body
    try{
        const product = await OrderMasuk.findByIdAndUpdate(_id, req.body)
        if(!product) return res.json({
            success: false,
            message: 'order masuk not found'
        })
        return res.json({
            success: true
        })
    }catch(err){
        if(err) return res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function deleteMasuk(){
    const {_id} = req.body
    try{
        const product = await OrderMasuk.findByIdAndDelete(_id)
        if(!product) return res.json({
            success: false,
            message: 'order masuk not found'
        })
        return res.json({
            success: true
        })
    }catch(err){
        if(err) return res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function batalSelesaiMasuk(req, res){
    const {kodeBarang, _id} = req.body
    try{
        const orderMasuk = await OrderMasuk.findById(_id)
        if(!orderMasuk) return res.json({
            success: false,
            message: 'order masuk not found'
        })

        const product = await Product.findOne({kodeBarang})
        if(!product) return res.json({
            success: false,
            message: 'product not found'
        })

        await orderMasuk.updateOne({selesai: false})
        await product.updateOne({quantity: eval(`${product.quantity} - ${orderMasuk.quantity}`)})
        return res.json({
            success:true
        })
    }catch(err){
        res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function doneMasuk(req, res){
    const {kodeBarang, _id} = req.body
    try{
        const orderMasuk = await OrderMasuk.findById(_id)
        if(!orderMasuk) return res.json({
            success: false,
            message: 'order masuk not found'
        })

        const product = await Product.findOne({kodeBarang})
        if(!product) return res.json({
            success: false,
            message: 'product not found, please add the product first'
        })

        await orderMasuk.updateOne({selesai: true})
        await product.updateOne({quantity: eval(`${product.quantity} + ${orderMasuk.quantity}`)})
        return res.json({
            success:true
        })
    }catch(err){
        res.json({
            success: false,
            message: 'error!!'
        })
    }
}

// ----------------------------------- Order Keluar --------------------------------------------------------//

async function orderKeluar(){
    const orderK = await OrderKeluar.find().lean()
    return res.json({
        orderKeluar: orderK
    })
}

async function postKeluar(req, res){
    const {BPB, namaBarang, kodeBarang, tanggal, quantity, namaPenerima} = req.body
    try{
        const newOrderKeluar = OrderKeluar({
            BPB,
            namaBarang,
            kodeBarang,
            tanggal,
            quantity,
            namaPenerima,
            selesai: false
        })
        await newOrderKeluar.save()
        res.json({
            success: true
        })
    }catch(err){
        res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function updateKeluar(req, res){
    const {_id} = req.body
    try{
        const orderKeluar = await OrderKeluar.findByIdAndUpdate(_id, req.body)
        if(!orderKeluar) return res.json({
            success: false,
            message: 'order keluar not found'
        })
        return res.json({
            success:true
        })
    }catch(err){
        res.json({
            success: false,
            message: 'error'
        })
    }
}

async function deleteKeluar(req, res){
    const {_id} = req.body
    try{
        const orderKeluar = await OrderKeluar.findByIdAndDelete(_id)
        if(!orderKeluar) return res.json({
            success: false,
            message: 'order keluar not found'
        })
        return res.json({
            success: true
        })
    }catch(err){
        res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function batalSelesaiKeluar(req, res){
    const {kodeBarang, _id} = req.body
    try{
        const orderKeluar = await OrderKeluar.findById(_id)
        if(!orderKeluar) return res.json({
            success: false,
            message: 'order masuk not found'
        })

        const product = await Product.findOne({kodeBarang})
        if(!product) return res.json({
            success: false,
            message: 'product not found, please add the product first'
        })

        await orderKeluar.updateOne({selesai: true})
        await product.updateOne({quantity: eval(`${product.quantity} + ${orderKeluar.quantity}`)})
        return res.json({
            success:true
        })
    }catch(err){
        res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function doneKeluar(req, res){
    const {kodeBarang, _id} = req.body
    try{
        const orderKeluar = await OrderKeluar.findById(_id)
        if(!orderKeluar) return res.json({
            success: false,
            message: 'order masuk not found'
        })

        const product = await Product.findOne({kodeBarang})
        if(!product) return res.json({
            success: false,
            message: 'product not found, please add the product first'
        })

        await orderKeluar.updateOne({selesai: true})
        await product.updateOne({quantity: eval(`${product.quantity} - ${orderKeluar.quantity}`)})
        return res.json({
            success:true
        })
    }catch(err){
        res.json({
            success: false,
            message: 'error!!'
        })
    }
}

module.exports = {
    orderMasuk,
    postMasuk,
    updateMasuk,
    deleteMasuk,
    batalSelesaiMasuk,
    doneMasuk,
    orderKeluar,
    postKeluar,
    updateKeluar,
    deleteKeluar,
    batalSelesaiKeluar,
    doneKeluar
}