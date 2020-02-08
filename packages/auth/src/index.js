const fetch = require('node-fetch');
const AuthToken = require('./token');

class MarketingCloudAuth {
  /**
   * @see https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/access-token-s2s.htm
   *
   * @param {object} options
   * @param {string} options.clientId The Marketing Cloud API ID
   * @param {string} options.clientSecret The Marketing Cloud API Scecret
   * @param {string} options.authUrl The Marketing Cloud auth URL
   * @param {string} options.accountId Account identifier, or MID, of the target business unit.
   *                 If not specified, will use the BU that created the integration.
   */
  constructor({
    clientId,
    clientSecret,
    authUrl,
    accountId,
  } = {}) {
    if (!clientId || !clientSecret || !authUrl) {
      throw new Error('The `clientId`, `clientSecret` and `authUrl` options are required.');
    }
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.authUrl = authUrl;
    this.accountId = accountId;
  }

  /**
   * Retrieves an access token.
   * Will only make a request if the token is falsy, expired, or the method
   * forces the request.
   *
   * @param {object} options
   * @param {boolean} options.force Whether to force a new auth token request.
   * @param {?object} options.fetchOptions Additional options to send to `fetch`.
   */
  async retrieve({ force = false, fetchOptions } = {}) {
    if ((this.token && this.token.hasExpired()) || force) {
      this.fetchPromise = this.fetch(fetchOptions);
    }
    if (!this.fetchPromise) {
      this.fetchPromise = this.fetch(fetchOptions);
    }
    try {
      const {
        accessToken,
        expiresIn,
        retrievedAt,
        soapUrl,
        restUrl,
        scope,
      } = await this.fetchPromise;
      this.token = new AuthToken({
        value: accessToken,
        expiresIn,
        retrievedAt,
        soapUrl,
        restUrl,
        scope,
      });
      return this.token;
    } catch (e) {
      this.fetchPromise = undefined;
      throw e;
    }
  }

  /**
   * Executes an authentication fetch request to Marketing Cloud.
   *
   * @private
   * @param {object} options Additional options to send to `fetch`.
   * @returns {Promise<string>} The Marketing Cloud access token.
   */
  async fetch(options = {}) {
    const { clientId, clientSecret, accountId } = this;
    // Set the retrievedAt before the request so the expiration will be slightly padded.
    const retrievedAt = new Date();
    const res = await fetch(`${this.authUrl}/v2/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        account_id: accountId || undefined,
      }),
      ...options,
    });

    const {
      access_token: accessToken,
      expires_in: expiresIn,
      error,
      error_description: message,
      soap_instance_url: soapUrl,
      rest_instance_url: restUrl,
      scope,
    } = await res.json();

    if (error) {
      throw new Error(message || 'An unknown, fatal error occured.');
    }
    return {
      accessToken,
      expiresIn,
      retrievedAt,
      soapUrl,
      restUrl,
      scope,
    };
  }
}

module.exports = MarketingCloudAuth;
