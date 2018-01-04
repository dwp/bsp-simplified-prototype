const express = require('express')
const {logOnPost} = require('../../../../lib/utils')
const router = new express.Router()

// Log session to console on POST requests
router.use(logOnPost)

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/start`)
})

module.exports = router
