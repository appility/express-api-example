const express = require("express")
const router = express.Router()

router.get("/", function (req, res) {
  res.render('home', { active: { home: true }});
})

router.get("/reports", function (req, res) {
  res.render('reports', { active: {reports: true }});
})

module.exports = router
