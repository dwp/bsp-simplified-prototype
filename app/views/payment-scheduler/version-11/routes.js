const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/find-a-payment-schedule`)
})

router.get('/find-a-payment-schedule', (req, res) => {
  const nino = req.query.nino
  res.render(`${req.feature}/${req.sprint}/find-a-payment-schedule`, {nino})
})

module.exports = router
