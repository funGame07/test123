const Product = require('../model/productSchema')
const { options } = require('../routes/admin')

async function getProduct(req, res){
    const products = await Product.find().lean()
    return res.json({
        products
    })
}

async function postProduct(req, res){
    const {img, namaBarang, kodeBarang, quantity, gudang} = req.body
    try{
        const newProduct = Product({
            img, 
            namaBarang,
            kodeBarang,
            quantity,
            gudang
        })
        await newProduct.save()
        res.json({
            success: true
        })
    }catch(err){
        if(err.code === 11000) return res.json({
            success: false,
            message: 'kode barang is already exist'
        })
        return res.json({
            success: false,
            message: 'error!!'
        })
    }
}

async function updateProduct(req, res){
    const {_id} = req.body
    try{
        const product = await Product.findByIdAndUpdate(_id, req.body)
        if(!product) return res.json({
            success: false,
            message: 'product not found'
        })
        return res.json({
            success: true
        })
    }catch(err){
        res.json({
            success:false,
            message: 'error!!'
        })
    }
}

async function deleteProduct(req, res){
    const {_id} = req.body
    try{
        const product = await Product.findByIdAndDelete(_id, req.body)
        if(!product) return res.json({
            success: false,
            message: 'product not found'
        })
        return res.json({
            success: true
        })
    }catch(err){
        res.json({
            success:false,
            message: 'error!!'
        })
    }
}

async function findProduct(req, res){
    const {search} = req.body
    const product = await Product.find({
        $or:[
            {kodeBarang: {$regex: search, $options: 'i'}},
            {namaBarang: {$regex: search, $options: 'i'}}
        ]
    })
    return res.json({
        product
    })
}

module.exports = {
    getProduct,
    postProduct,
    updateProduct,
    deleteProduct,
    findProduct
}