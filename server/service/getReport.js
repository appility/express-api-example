/*
 * request the report data
 */

const fetch = require("node-fetch")
const { SERVICE_REPORTS_STATUS_ENDPOINT } = require("./../config")

module.exports = async function (job_id) {
  let headers = {
    Authorization: `Bearer ${global.serviceContextToken.access_token}`,
    Accept: "application/json",
  }
  let url = `${SERVICE_REPORTS_STATUS_ENDPOINT}${job_id}`
  return fetch(url, { method: "GET", headers: headers })
}
