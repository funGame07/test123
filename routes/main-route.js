const router = require('express').Router()

router.use('/admin', require('./admin'))
router.use('/product', require('./product'))
router.use('/order', require('./order'))

module.exports = router