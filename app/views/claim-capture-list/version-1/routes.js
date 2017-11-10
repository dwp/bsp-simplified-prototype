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
  res.redirect(`/${req.feature}/${req.sprint}/create-new-claim`)
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
// Create new claim ------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/create-new-claim', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/create-new-claim/create-new-claim`)
})
router.post('/create-new-claim', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/claim/1/paused`)
})

// -----------------------------------------------------------------------------
// Claim -----------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:id/:status', (req, res) => {
  const id = req.params.id
  const status = req.params.status
  res.render(`${req.feature}/${req.sprint}/claim/claim-paused`, {id, status})
})

// -----------------------------------------------------------------------------
// Capture ---------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/capture/:id/:page', (req, res) => {
  const id = req.params.id
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/capture/${page}`, {id})
})
router.post('/capture/:id/:page', (req, res) => {
  const id = req.params.id
  addToLog(req, 'capture')
  res.redirect(`/${req.feature}/${req.sprint}/claim/${id}/paused`)
})

function addToLog (req, type) {
  const log = req.session.data.log || []
  const page = req.params.page
  if (type === 'capture') {
    const details = page.split('-')
    const message = `${capitalizeFirstLetter(details[0])} ${details[1]} entered`
    log.push(message)
  }
  const set = Array.from(new Set(log))
  req.session.data.log = set
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = router
