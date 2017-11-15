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
  res.redirect(`/${req.feature}/${req.sprint}/start-a-new-claim`)
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
// Start a new claim ------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/start-a-new-claim', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/start-a-new-claim/start-a-new-claim`)
})
router.post('/start-a-new-claim', (req, res) => {
  const scenario = req.session.data.scenario || 1
  res.redirect(`/${req.feature}/${req.sprint}/claim/${scenario}/paused`)
})

// -----------------------------------------------------------------------------
// Claim -----------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/claim/:id/:status', (req, res) => {
  const id = req.params.id
  const status = req.params.status
  if (status === 'paused') {
    return res.render(`${req.feature}/${req.sprint}/claim/claim-paused`, {id, status})
  }
  if (status === 'paused-tasks') {
    return res.render(`${req.feature}/${req.sprint}/claim/claim-paused-tasks`, {id, status})
  }
  if (status === 'disallowed') {
    return res.render(`${req.feature}/${req.sprint}/claim/claim-disallowed`, {id, status})
  }
  res.render(`${req.feature}/${req.sprint}/claim/claim-allowed`, {id, status})
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
  const page = req.params.page
  if (page === 'pause-claim') {
    res.redirect(`/${req.feature}/${req.sprint}/decisions/${id}/paused`)    
  }
  addToLog(req, 'capture')
  res.redirect(`/${req.feature}/${req.sprint}/claim/${id}/paused`)
})

// -----------------------------------------------------------------------------
// Verify ----------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/verify/:id/:page', (req, res) => {
  const id = req.params.id
  const page = req.params.page
  res.render(`${req.feature}/${req.sprint}/verify/${page}`, {id})
})
router.post('/verify/:id/:page', (req, res) => {
  const id = req.params.id
  addToLog(req, 'verify')
  res.redirect(`/${req.feature}/${req.sprint}/claim/${id}/paused`)
})

// -----------------------------------------------------------------------------
// Check and submit ------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/process/:id/check-and-submit', (req, res) => {
  const id = req.params.id
  res.render(`${req.feature}/${req.sprint}/check-and-submit/check-and-submit`, {id})
})
router.post('/process/:id/check-and-submit', (req, res) => {
  const id = req.params.id
  const scenario = req.session.data.scenario
  if (scenario === '2') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${id}/disallowed`)
  }
  if (scenario === '3') {
    return res.redirect(`/${req.feature}/${req.sprint}/decisions/${id}/pause`)
  }
  res.redirect(`/${req.feature}/${req.sprint}/decisions/${id}/allowed`)
})

// -----------------------------------------------------------------------------
// Decisions -------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/decisions/:id/:status', (req, res) => {
  const id = req.params.id
  const status = req.params.status
  if (status === 'allowed') {
    return res.render(`${req.feature}/${req.sprint}/decisions/allowed`, {id})
  }
  if (status === 'disallowed') {
    return res.render(`${req.feature}/${req.sprint}/decisions/disallowed`, {id})
  }
  if (status === 'pause') {
    return res.redirect(`/${req.feature}/${req.sprint}/capture/${id}/pause-claim`)
  }
  if (status === 'paused') {
    return res.render(`${req.feature}/${req.sprint}/decisions/paused-payment`, {id})
  }
  return res.render(`${req.feature}/${req.sprint}/decisions/allowed`, {id, status})
})

// -----------------------------------------------------------------------------
// Schedule --------------------------------------------------------------------
// -----------------------------------------------------------------------------
router.get('/schedule/:id', (req, res) => {
  const id = req.params.id
  res.render(`${req.feature}/${req.sprint}/schedule/schedule`, {id})
})

// -----------------------------------------------------------------------------
// Functions -------------------------------------------------------------------
// -----------------------------------------------------------------------------
function addToLog (req, type) {
  const log = req.session.data.log || []
  const page = req.params.page
  if (type === 'capture') {
    const details = page.split('-')
    if (details[0] === 'payment' && req.body['payment-details-provided'] === 'No') {
      return
    }
    const message = `${capitalizeFirstLetter(details[0])} ${details[1]} entered`
    log.push(message)
  }
  if (type === 'verify') {
    const details = page.split('-')
    if (page === 'child-benefit') {
      const message = `${capitalizeFirstLetter(details[0])} ${details[1]} verified`
      log.push(message)
    } else {
      const message = `${capitalizeFirstLetter(details[0])} verified`
      log.push(message)
    }
  }
  const set = Array.from(new Set(log))
  req.session.data.log = set
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

module.exports = router
