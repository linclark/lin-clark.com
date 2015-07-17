// This isn't a store in the Flux sense, but could be turned into one later.
var ContentStore = {
  /**
   * Get a piece of content.
   */
  getPost: function(type, year, month, day, filename) {
    var json = require(`./../content/${type}/${year}/${month}/${day}/${filename}.md`);
    return json;
  },

};

module.exports = ContentStore;
