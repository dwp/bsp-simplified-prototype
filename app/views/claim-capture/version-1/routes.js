const express = require('express')

const router = new express.Router()

router.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(req.session.data)
  }
  next()
})

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/settings`)
})

router.post('/settings', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/find-a-claim`)
})

router.get('/start-new-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claim-date`)
})

router.post('/claim-date', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claimant-details`)
})

router.post('/claimant-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/partner-details`)
})

router.post('/partner-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/children-details`)
})

router.post('/children-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/payment-details`)
})

router.post('/payment-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details`)
})

module.exports = router
