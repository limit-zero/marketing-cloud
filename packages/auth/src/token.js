class AuthToken {
  /**
   *
   * @param {object} params
   * @param {string} params.value The access token value.
   * @param {number} params.expiresIn The number of seconds until the token expires.
   * @param {Date} params.retrievedAt The Date when the token was retrieved.
   * @param {string} params.soapUrl The tenant-specific SOAP URL. Use this for making requests.
   * @param {string} params.restUrl The tenant-specific REST URL. Use this for making requests.
   * @param {string} params.scope The permission scope.
   */
  constructor({
    value,
    expiresIn,
    retrievedAt,
    soapUrl,
    restUrl,
    scope,
  } = {}) {
    this.value = value;
    this.expiresIn = Number(expiresIn);
    this.retrievedAt = retrievedAt instanceof Date ? retrievedAt : null;

    this.expiresOn = this.expiresIn > 0 && this.retrievedAt
      ? new Date(this.retrievedAt.valueOf() + (this.expiresIn * 1000))
      : new Date();

    this.soapUrl = soapUrl;
    this.restUrl = restUrl;
    this.scope = scope ? scope.split(' ') : [];
  }

  /**
   * Determines if the token is valid.
   *
   * @returns {boolean}
   */
  isValid() {
    if (this.hasExpired()) return false;
    if (this.value) return true;
    return false;
  }

  /**
   * Determines if the token has expired.
   *
   * @returns {boolean}
   */
  hasExpired() {
    if (!this.value) return false;
    return Date.now() >= this.expiresOn.valueOf();
  }

  /**
   * Converts this class to the string value of the token.
   *
   * @returns {string}
   */
  toString() {
    if (!this.value) return '';
    return this.value;
  }
}

module.exports = AuthToken;
