module.exports = (clientId) => {
  if (clientId === 7234512) return 'Industrial Media';
  if (clientId === 7323587) return 'Indutrial Media Marketing';
  throw new Error('Unknown client ID found');
};
