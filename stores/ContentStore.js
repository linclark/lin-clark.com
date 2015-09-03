// This isn't a store in the Flux sense, but could be turned into one later.
var ContentStore = {
  /**
   * Get a piece of content that is published on this site.
   */
  getPost: function(type, year, month, day, filename) {
    var route = _assembleRoute([type, year, month, day, filename]);
    return _loadContent(route);
  },

  /**
   * Get a subset of content entries in reverse chronological order.
   * @param {int} num - Number of posts
   */
  getContent: function(num) {
    var content = [];

    if (num === undefined) num = 1000

    this.getRoutes().splice(0, num).forEach(function(route) {
      var post = _loadContent(route);
      if (route.indexOf("/offsite/") !== -1) {
        post.type = "linkout";
      }
      content.push(post);
    });
    return content;
  },

  /**
   * Get all the content routes.
   */
  getRoutes: function(type) {
    var read = require('fs-readdir-recursive')

    var paths = read('./content/')
      .filter(function(path) {
        if (type) {
          return path.indexOf(type) !== -1;
        }
        return true;
      })
      .sort(function(a, b) {
        var re = /.*\/(\d+\/\d+\/\d+)\/.*/;
        var aMatch = re.exec(a);
        var bMatch = re.exec(b);
        return new Date(bMatch[1]) - new Date(aMatch[1]);
      }).map(function(path) {
        return '/' + path.replace('.md', '')
      })
    return paths;
  }
};

/**
 * Load content for a route.
 * @param {string} route
 */
function _loadContent(route) {
  var content= require("./../content" + route + ".md");
  if (!content.link) {
    content.link = route;
  }
  return content;
}

/**
 * Assemble a route string from parts.
 * @param {array}
 */
function _assembleRoute(parts) {
  return "/" + parts.join("/");
}

module.exports = ContentStore;
