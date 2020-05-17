const express = require("express")
const router = express.Router()
const getJobId = require("./../service/getJobId.js")
const getReport = require("./../service/getReport.js")

router.get("/report/:job_id", function (req, res) {
  let job_id = req.params.job_id
  getReport(job_id)
    .then(function (response) {
      return response.json()
    })
    .then((response) => {
      res.json(response)
    })
    .catch((error) => {
      res.status(500).send({error: 'Oops'});
    })
})

router.get("/getJobId", function (req, res) {
  getJobId()
    .then(function (response) {
      return response.json()
    })
    .then((response) => {
      res.json(response)
    })
    .catch((error) => {
      res.status(500).send({error: 'Oops'});
    })
})

module.exports = router
