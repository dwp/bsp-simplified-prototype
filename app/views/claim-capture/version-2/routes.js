const express = require('express')

const router = new express.Router()

router.use((req, res, next) => {
  if (req.method === 'POST') {
    console.log(JSON.stringify(req.session.data, null, 2))
  }
  next()
})

// -----------------------------------------------------------------------------
// Settings --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/settings`)
})

router.post('/settings', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/start-new-claim`)
})

// -----------------------------------------------------------------------------
// Find a claim ----------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/find-a-claim', (req, res) => {
  const nino = req.query.findNino
  const search = nino ? nino.toUpperCase() : ''
  res.render(`${req.feature}/${req.sprint}/find-a-claim/find-a-claim`, {search})
})

// -----------------------------------------------------------------------------
// Capture a claim -------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/start-new-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claim-date`)
})

router.get('/claim-date', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/claim-date`)
})
router.post('/claim-date', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claimant-details`)
})

router.get('/claimant-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/claimant-details`)
})
router.post('/claimant-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/partner-details`)
})

router.get('/partner-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/partner-details`)
})
router.post('/partner-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/children-details`)
})

router.get('/children-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/children-details`)
})
router.post('/children-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/payment-details`)
})

router.get('/payment-details', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/payment-details`)
})
router.post('/payment-details', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/confirm-details`)
})

router.get('/confirm-details/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/confirm-details`, {id: req.params.id, changeLinks: true})
})
router.post('/confirm-details', (req, res) => {
  if (req.session.data.dateOfClaim) {
    const day = String(req.session.data.dateOfClaim.day).padStart(2, '0')
    const month = req.session.data.dateOfClaim.month
    const year = req.session.data.dateOfClaim.year
    const date = day + month + year
    if (date === '02102017') {
      return res.redirect(`/${req.feature}/${req.sprint}/decision-disallowed/2`)
    }
    if (date === '03102017') {
      return res.redirect(`/${req.feature}/${req.sprint}/pause-claim/3`)
    }
  }
  res.redirect(`/${req.feature}/${req.sprint}/decision-allowed/1`)
})

router.get('/pause-claim/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/capture/pause-claim`, {id: req.params.id})
})
router.post('/pause-claim/:id', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/decision-paused/${req.params.id}`)
})

// -----------------------------------------------------------------------------
// Decisions -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/decision-allowed/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decisions/allowed`, {id: req.params.id})
})

router.get('/decision-disallowed/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decisions/disallowed`, {id: req.params.id})
})

router.get('/decision-paused/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/decisions/paused`, {id: req.params.id})
})

// -----------------------------------------------------------------------------
// Tasks -----------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/verify-marriage/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/tasks/verify-marriage`, {id: req.params.id})
})

router.post('/verify-marriage/:id', (req, res) => {
  const id = req.params.id
  if (id === '4') {
    req.session.data.pausedClaims = 'No'
  }
  if (req.body.marriageVerified === 'married') {
    return res.redirect(`/${req.feature}/${req.sprint}/decision-allowed/${id}`)
  }
  if (req.body.marriageVerified === 'not-married') {
    return res.redirect(`/${req.feature}/${req.sprint}/decision-disallowed/${id}`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/decision-paused/${id}`)
})

// -----------------------------------------------------------------------------
// View claim ------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:id/:status', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/claim/claim`, {id: req.params.id, status: req.params.status})
})

// -----------------------------------------------------------------------------
// View schedule ---------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/schedule/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {id: req.params.id, status: req.params.status})
})

module.exports = router
