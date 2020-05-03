const { UserInputError } = require('apollo-server-express');

module.exports = ({ input = {}, keys = [] } = {}) => {
  const [key1, key2] = keys;
  const value1 = input[key1];
  const value2 = input[key2];
  if (!value1 && !value2) throw new UserInputError(`Either ${key1} or ${key2} input must be provided.`);
  if (value1 && value2) throw new UserInputError(`You cannot provide both ${key1} and ${key2} as input.`);
};
