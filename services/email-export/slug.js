const slug = require('slug');

slug.extend({
  '/': '-',
  _: '-',
});

module.exports = slug;
