/*
* authenticate with the WSD Identity service
*/

const fetch = require('node-fetch');
const { SERVICE_OAUTH_ENDPOINT, SERVICE_CLIENT_ID, SERVICE_CLIENT_SECRET } = require('./../config');

module.exports = async function() {
  let values = { 
    client_id: process.env.SERVICE_CLIENT_ID,
    client_secret: process.env.SERVICE_CLIENT_SECRET,
    grant_type: 'client_credentials'
  }

  const params = new URLSearchParams();
  params.append('client_id', process.env.SERVICE_CLIENT_ID);
  params.append('client_secret', process.env.SERVICE_CLIENT_SECRET);
  params.append('grant_type', 'client_credentials');

  return fetch(SERVICE_OAUTH_ENDPOINT,{ 
    method: 'POST', 
    headers: { 
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: params
    })
    .then(function(response) {
      return response.json()
    })
}
