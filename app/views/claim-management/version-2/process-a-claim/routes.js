const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
  if (req.session.data.firstClaimProcessed) {
    res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/claim/2`)
  } else {
    res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/claim/1`)
  }
})

router.get('/claim/:id', (req, res) => {
  res.render(`${req.feature}/${req.sprint}/process-a-claim/claim${req.params.id}`)
})

router.get('/verify-:thing/:id', (req, res) => {
  const id = req.params.id
  res.render(`${req.feature}/${req.sprint}/process-a-claim/verify-${req.params.thing}`, {id})
})

router.post('/verify-:thing/:id', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/process-a-claim/claim${req.params.id}`)
})

router.get('/schedule-created', (req, res) => {
  req.session.data.firstClaimProcessed = true
  req.session.data.deathVerified = ''
  req.session.data.marriageVerified = ''
  req.session.data.chbVerified = ''
  req.session.data.contsVerified = ''
  res.render(`${req.feature}/${req.sprint}/process-a-claim/schedule-created`)
})

router.post('/set-reminder', (req, res) => {
  req.session.data.deathVerified = ''
  req.session.data.marriageVerified = ''
  req.session.data.chbVerified = ''
  req.session.data.contsVerified = ''
  res.redirect(`/${req.feature}/${req.sprint}/home`)
})

module.exports = router
