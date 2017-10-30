'use-strict'

function getResearchScenario (req) {
  if (req.session.data.scenario === '4') {
    if (req.session.data.dateOfClaim) {
      const day = String(req.session.data.dateOfClaim.day).padStart(2, '0')
      const month = req.session.data.dateOfClaim.month
      const year = req.session.data.dateOfClaim.year
      const date = day + month + year
      if (date === '01102017') {
        return 1
      }
      if (date === '02102017') {
        return 2
      }
      if (date === '03102017') {
        return 3
      }
    }
  }
  return false
}

module.exports = getResearchScenario
