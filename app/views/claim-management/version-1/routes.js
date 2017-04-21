const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  req.session.destroy()
  res.redirect(`/${req.feature}/${req.sprint}/settings`)
})

router.get('/capture-a-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/about-you`)
})

router.get('/process-a-claim', (req, res) => {
  const claimType = req.session.data.claimType || 'new'
  res.redirect(`/${req.feature}/${req.sprint}/claim-${claimType}`)
})

router.post('/settings', (req, res) => {
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
  res.redirect(`/${req.feature}/${req.sprint}/check-your-answers`)
})

router.post('/payment-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})

router.post('/claim-:id/verify-:something', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claim-${req.params.id}`)
})

router.post('/claim-:id/set-reminder', (req, res) => {
  req.session.data.deathVerified = ''
  req.session.data.marriageVerified = ''
  req.session.data.chbVerified = ''
  req.session.data.contsVerified = ''
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})

module.exports = router
