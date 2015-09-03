var ContentStore = require('./stores/ContentStore')

// data.js
module.exports = {
  title: 'Lin Clark',
  routes: [
    '/',
    "/writing",
  ].concat(ContentStore.getRoutes("blog"))
}
