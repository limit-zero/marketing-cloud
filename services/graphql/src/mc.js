const MarkingCloudSOAP = require('@marketing-cloud/soap');
const {
  FUEL_API_CLIENT_ID,
  FUEL_API_CLIENT_SECRET,
  FUEL_API_AUTH_URL,
} = require('./env');

module.exports = new MarkingCloudSOAP({
  clientId: FUEL_API_CLIENT_ID,
  clientSecret: FUEL_API_CLIENT_SECRET,
  authUrl: FUEL_API_AUTH_URL,
});
