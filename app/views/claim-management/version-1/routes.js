const express = require('express');

const router = new express.Router();

router.get('/', (req, res) => {
  res.redirect(`/${req.feature}/${req.sprint}/capture-a-claim`);
});

module.exports = router;
