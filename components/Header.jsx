// components/Header.jsx
var React = require('react')
var Router = require('react-router')

var Header = React.createClass({
  render: function () {
    return (
      <header>
        <a href='/'>Index</a>
        <a href='/blog'>Blog</a>
      </header>
    )
  }
})

module.exports = Header
