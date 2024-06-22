const router = require('express').Router()
const {isAuth} = require('../lib/utils')
const {postMasuk, updateMasuk, deleteMasuk, doneMasuk, orderMasuk, batalSelesaiMasuk} = require('../controllers/orderController')
const {postKeluar, updateKeluar, deleteKeluar, doneKeluar, orderKeluar, batalSelesaiKeluar} = require('../controllers/orderController')

router.use('/*', isAuth)

router.route('/masuk')
    .get(orderMasuk)
    .post(postMasuk)
    .patch(updateMasuk)
    .delete(deleteMasuk)

router.route('/masuk/selesai')
    .post(doneMasuk)

router.route('/masuk/batalselesai')
    .post(batalSelesaiMasuk)

router.route('/keluar')
    .get(orderKeluar)
    .post(postKeluar)
    .patch(updateKeluar)
    .delete(deleteKeluar)

router.route('/keluar/selesai')
    .post(doneKeluar)

router.route('/keluar/batalselesai')
    .post(batalSelesaiKeluar)

module.exports = router