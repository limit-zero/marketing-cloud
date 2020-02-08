const MarkingCloudSOAP = require('@marketing-cloud/soap');
const {
  FUEL_API_CLIENT_ID,
  FUEL_API_CLIENT_SECRET,
  FUEL_API_WSDL,
} = require('./env');

module.exports = new MarkingCloudSOAP({
  wsdl: FUEL_API_WSDL,
  auth: {
    clientId: FUEL_API_CLIENT_ID,
    clientSecret: FUEL_API_CLIENT_SECRET,
  },
});
