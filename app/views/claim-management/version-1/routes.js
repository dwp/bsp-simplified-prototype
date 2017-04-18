const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/about-you`)
})

router.post('/about-you', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/about-your-partner`)
})

router.post('/about-your-partner', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/about-your-children`)
})

module.exports = router
