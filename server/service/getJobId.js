/*
 * request a Job ID, required to request the report data
 */

const fetch = require("node-fetch")
const { SERVICE_REPORTS_STATUS_ENDPOINT } = require("./../config")

module.exports = async function () {
  let headers = {
    Authorization: `Bearer ${global.serviceContextToken.access_token}`,
    Accept: "application/json",
  }
  return fetch(SERVICE_REPORTS_STATUS_ENDPOINT, {
    method: "POST",
    headers: headers,
  })
}
