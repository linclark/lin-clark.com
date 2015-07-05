var read = require('fs-readdir-recursive')

var paths = read('./content/').map(function(path) {
  return path.replace('.md', '')
})

// data.js
module.exports = {
  title: 'Lin Clark',
  routes: [
    '/',
    '/2015/09/09/foo'
  ].concat(paths)
}
