const express = require('express')

const router = new express.Router()

// Get Sprint and Feature for URL links
router.use('/', (req, res, next) => {
  req.feature = req.originalUrl.split('/')[1]
  req.sprint = req.originalUrl.split('/')[2]
  res.locals.feature = req.feature
  res.locals.sprint = req.sprint
  next()
})

router.get('/', (req, res) => {
  res.render('index')
})

// Payment Scheduler
router.use('/payment-scheduler/version-1', require('./views/payment-scheduler/version-1/routes'))
router.use('/payment-scheduler/version-2', require('./views/payment-scheduler/version-2/routes'))
router.use('/payment-scheduler/version-3', require('./views/payment-scheduler/version-3/routes'))
router.use('/payment-scheduler/version-4', require('./views/payment-scheduler/version-4/routes'))
router.use('/payment-scheduler/version-5', require('./views/payment-scheduler/version-5/routes'))
router.use('/payment-scheduler/version-6', require('./views/payment-scheduler/version-6/routes'))

// Claim Management
router.use('/claim-management/version-1', require('./views/claim-management/version-1/routes'))
router.use('/claim-management/version-2', require('./views/claim-management/version-2/routes'))

module.exports = router
