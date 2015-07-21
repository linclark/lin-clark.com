var React = require('react')
var ContentStore = require('./../stores/ContentStore')

var Blog = React.createClass({
  getInitialState: function () {
    var {year, month, day, filename} = this.props.params;
    return ContentStore.getPost('blog', year, month, day, filename)
  },
  render: function () {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: this.state.__content }}></div>
      </div>
    )
  }
})

module.exports = Blog
