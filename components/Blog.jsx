var React = require('react')

var Blog = React.createClass({
  getInitialState: function () {
    var {year, month, day, filename} = this.props.params;
    var json = require(`./../content/blog/${year}/${month}/${day}/${filename}.md`);

    return json;
  },
  render: function () {
    return (
      <div>
        <h2>{this.state.title}</h2>
      </div>
    )
  }
})

module.exports = Blog
