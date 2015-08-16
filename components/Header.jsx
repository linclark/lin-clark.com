// components/Header.jsx
var React = require('react')
var Router = require('react-router')
var IntroHeader = require('./IntroHeader')

var Header = React.createClass({
  render: function () {
    var hi = <div className="hello">Hi, I'm <a href='/'>Lin Clark</a></div>;
    var h = (this.props.path == "/") ? <IntroHeader>{hi}</IntroHeader> : {hi};
    return (
      <header>
        {h}
      </header>
    )
  }
})

module.exports = Header
