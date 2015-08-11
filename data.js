var ContentStore = require('./stores/ContentStore')

// data.js
module.exports = {
  title: 'Lin Clark',
  routes: [
    '/',
  ].concat(ContentStore.getRoutes("blog"))
}
