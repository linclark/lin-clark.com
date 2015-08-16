// components/Header.jsx
var React = require('react')
var Router = require('react-router')
var IntroHeader = require('./IntroHeader')

var Header = React.createClass({
  render: function () {
    var h = (this.props.path == "/") ? <IntroHeader /> : <div>Hi, I'm Lin Clark</div>;
    return (
      <header>
        {h}
      </header>
    )
  }
})

module.exports = Header
