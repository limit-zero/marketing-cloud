const pretty = require('pretty');
const { get } = require('object-path');

class ResponseError extends Error {
  /**
   *
   * @param {object} params
   * @param {object} params.result
   * @param {string} params.rawResponse
   * @param {string} params.rawRequest
   * @param {string} message
   * @param  {...any} args
   */
  constructor({ result, rawResponse, rawRequest } = {}, message, ...args) {
    const errorMessage = get(result, 'Results.0.ErrorMessage');
    const statusMessage = get(result, 'Results.0.StatusMessage');
    super(errorMessage || statusMessage || message, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ResponseError);
    }
    this.result = result;
    this.rawResponse = pretty(rawResponse || '');
    this.rawRequest = pretty(rawRequest || '');
  }
}

ResponseError.pattern = /^error/i;

module.exports = ResponseError;
