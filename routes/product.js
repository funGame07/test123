const router = require('express').Router()
const {getProduct, postProduct, updateProduct, findProduct, deleteProduct} = require('../controllers/productController')
const {isAuth} = require('../lib/utils')

router.route('/')
    .get(isAuth, getProduct)
    .post(isAuth, postProduct)
    .patch(isAuth, updateProduct)

router.route('/find')
    .post(isAuth, findProduct)

router.route('/delete')
    .delete(isAuth, deleteProduct)

module.exports = router