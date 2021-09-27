const express = require('express')
const router = express.Router()
const complaincontroller = require('../controller/complaincontroller')
const isauthenticated = require('../middleware/isauthenticated')

router.post('/sendcomplain',isauthenticated, complaincontroller.send_complain)
router.get('/getcomplain',isauthenticated, complaincontroller.get_complaints)
router.get('/getusercomplain/:userId',isauthenticated, complaincontroller.get_user_complaints)
router.delete('/deletecomplain/:id',isauthenticated, complaincontroller.delete_user_complaint)

module.exports = router