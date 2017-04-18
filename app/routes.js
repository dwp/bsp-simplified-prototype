const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

// Payment Scheduler
router.use('/payment-scheduler/version-1', require('./views/payment-scheduler/version-1/routes'))
router.use('/payment-scheduler/version-2', require('./views/payment-scheduler/version-2/routes'))
router.use('/payment-scheduler/version-3', require('./views/payment-scheduler/version-3/routes'))
router.use('/payment-scheduler/version-4', require('./views/payment-scheduler/version-4/routes'))
router.use('/payment-scheduler/version-5', require('./views/payment-scheduler/version-5/routes'))

// Claim Management
router.use('/claim-management/version-1', require('./views/claim-management/version-1/routes'))

module.exports = router
