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

router.get('/find-a-claim', (req, res) => {
  const nino = req.query.findNino
  const search = nino ? nino.toUpperCase() : ''
  res.render(`${req.feature}/${req.sprint}/find-a-claim`, {search})
})

router.get('/start-new-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claim-date`)
})

router.post('/claim-date', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claimant-details`)
})

router.post('/claimant-details', (req, res) => {
  const birthYear = parseInt(req.body.claimant.dateOfBirth.year)
  if (birthYear < 1952) {
    return res.redirect(`/${req.feature}/${req.sprint}/rejected-ineligible`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/partner-details`)
})

router.post('/partner-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/children-details`)
})

router.post('/children-details', (req, res) => {
  const marriageVerified = req.session.data.verification['marriage-verified']
  if (marriageVerified === 'Yes') {
    return res.redirect(`/${req.feature}/${req.sprint}/payment-details`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/pause-claim`)
})

router.post('/payment-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details`)
})

router.post('/pause-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/paused-marriage`)
})

module.exports = router
