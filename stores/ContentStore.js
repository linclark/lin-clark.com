// This isn't a store in the Flux sense, but could be turned into one later.
var ContentStore = {
  /**
   * Get a piece of content that is published on this site.
   */
  getPost: function(type, year, month, day, filename) {
    pathFragments = [type, year, month, day, filename];
    var json = require("./../content/" + pathFragments.join("/") + ".md");
    return json;
  },

  /**
   * Get a subset of content entries in reverse chronological order.
   * @param {int} num - Number of posts
   */
  getContent: function(num) {
    return this.getRoutes().splice(0, num);
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

module.exports = ContentStore;
