const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/capture-a-claim/about-you`)
})

router.post('/about-you', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/capture-a-claim/about-your-partner`)
})

router.post('/about-your-partner', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/capture-a-claim/about-your-children`)
})

router.post('/about-your-children', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/capture-a-claim/payment-details`)
})

router.post('/payment-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/capture-a-claim/check-your-answers`)
})

module.exports = router
