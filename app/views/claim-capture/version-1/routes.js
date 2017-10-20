const express = require('express')

const router = new express.Router()

router.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(JSON.stringify(req.session.data, null, 2))
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

router.post('/confirm-details', (req, res) => {
  if (req.session.data.dateOfClaim) {
    const day = String(req.session.data.dateOfClaim.day).padStart(2, '0')
    const month = req.session.data.dateOfClaim.month
    const year = req.session.data.dateOfClaim.year
    const date = day + month + year

    if (date === '02102017') {
      return res.redirect(`/${req.feature}/${req.sprint}/decision-disallowed`)
    }
    if (date === '03102017') {
      return res.redirect(`/${req.feature}/${req.sprint}/pause-claim`)
    }
  }
  res.redirect(`/${req.feature}/${req.sprint}/decision-allowed`)
})

router.post('/pause-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/decision-paused`)
})

router.post('/verify-marriage', (req, res) => {
  if (req.body.marriageVerified === 'Yes') {
    req.session.data.pausedClaims = 'No'
    return res.redirect(`/${req.feature}/${req.sprint}/decision-allowed`)    
  }
  res.redirect(`/${req.feature}/${req.sprint}/decision-paused`)
})

module.exports = router
