const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})

router.post('/about-you', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/about-your-partner`)
})

router.post('/about-your-partner', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/about-your-children`)
})

router.post('/about-your-children', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/payment-details`)
})

router.post('/payment-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})
module.exports = router
