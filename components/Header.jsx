// components/Header.jsx
var React = require('react')
var Router = require('react-router')
var Link = Router.Link

var Header = React.createClass({
  render: function () {
    return (
      <header>
        <Link to='/'>Index</Link>
        <Link to='/about'>About</Link>
      </header>
    )
  }
})

module.exports = Header
