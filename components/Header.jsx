// components/Header.jsx
var React = require('react')
var Router = require('react-router')
var IntroHeader = require('./IntroHeader')

var Header = React.createClass({
  render: function () {
    var h = (this.props.path == "/") ? <IntroHeader /> : "";
    return (
      <header>
        {h}
      </header>
    )
  }
})

module.exports = Header
