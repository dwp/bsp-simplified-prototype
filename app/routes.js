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
router.use(/\/payment-scheduler\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/payment-scheduler/version-${req.params[0]}/routes`)(req, res, next);
})

// Claim Management
router.use(/\/claim-management\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/claim-management/version-${req.params[0]}/routes`)(req, res, next);
})

// Claim Capture
router.use(/\/claim-capture\/version-([0-9]+)/, (req, res, next) => {
  require(`./views/claim-capture/version-${req.params[0]}/routes`)(req, res, next);
})

module.exports = router
