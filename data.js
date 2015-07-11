var read = require('fs-readdir-recursive')

var paths = read('./content/').map(function(path) {
  return '/' + path.replace('.md', '')
})

// data.js
module.exports = {
  title: 'Lin Clark',
  routes: [
    '/',
  ].concat(paths)
}
