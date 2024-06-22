const router = require('express').Router()
const {deleteAdmin, login, signup} = require('../controllers/adminController')

router.route('/delete')
    .delete(deleteAdmin)

router.route('/login')
    .post(login)

router.route('/signup')
    .post(signup)

module.exports = router