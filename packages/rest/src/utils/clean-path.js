module.exports = (path) => {
  if (!path) return '';
  const trimmed = `${path}`.trim();
  if (!trimmed.length) return '';
  return trimmed.replace(/^\/+/, '').replace(/\/+$/, '');
};
