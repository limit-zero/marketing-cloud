const fetch = require('node-fetch');
const MarketingCloudAuth = require('@marketing-cloud/auth');
const cleanPath = require('./utils/clean-path');

class MarketingCloudREST {
  /**
   *
   * @param {object} options The REST client options.
   * @param {string} options.clientId The Marketing Cloud API ID
   * @param {string} options.clientSecret The Marketing Cloud API Scecret
   * @param {string} options.authUrl The Marketing Cloud auth URL for your tenant
   * @param {number} [options.accountId] Optional account identifier of the target business unit
   * @param {object} [options.fetchOptions] Additional node-fetch options
   */
  constructor({
    clientId,
    clientSecret,
    authUrl,
    accountId,
    fetchOptions = {},
  } = {}) {
    this.auth = new MarketingCloudAuth({
      clientId,
      clientSecret,
      authUrl,
      accountId,
    });
    this.fetchOptions = fetchOptions;
  }

  /**
   * Performs a request to the REST API.
   */
  async request({
    method = 'GET',
    body,
    endpoint,
    headers,
  }) {
    this.token = await this.auth.retrieve();
    const path = cleanPath(endpoint);
    if (!path) throw new Error('No API endpoint was provided.');

    const url = `${this.token.restUrl.replace(/\/+$/, '')}/${path}`;
    const options = {
      method,
      headers: {
        ...headers,
        authorization: `Bearer ${this.token.value}`,
        ...(body && { 'content-type': 'application/json' }),
      },
      ...(body && { body: JSON.stringify(body) }),
    };

    const res = await fetch(url, options);
    const json = await res.json();
    if (!res.ok) {
      const message = json.message
        ? `${json.message} (code: ${json.errorcode}) ${json.documentation}`.trim()
        : `${res.status} ${res.statusText}`;
      const error = new Error(message);
      error.statusCode = res.status;
      error.statusText = res.statusText;
      error.json = json;
      error.res = res;
      throw error;
    }
    return json;
  }
}

module.exports = MarketingCloudREST;
