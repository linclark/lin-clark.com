var yml = require('yaml-front-matter')
var fs = require('fs')
var objectPath = require('object-path')
var routes = require('./data').routes
var content = {}

routes.forEach(function(route) {
  var path = route.split('/')

  if (path[1] === 'blog')  {
    path.splice(0,1)
    var paths = path.map(function(part) {
      return String(part)
    })
    objectPath.set(content, paths, yml.loadFront(fs.readFileSync('./content' + route + '.md', 'utf8')))
  }
})

fs.writeFileSync('content-store.json', JSON.stringify(content));
