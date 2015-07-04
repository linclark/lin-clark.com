// components/Header.jsx
var React = require('react')
var Router = require('react-router')
var Link = Router.Link

var Header = React.createClass({
  render: function () {
    return (
      <header>
        <Link to='/'>Index</Link>
        <Link to='/2015/09/09/foo'>blog</Link>
      </header>
    )
  }
})

module.exports = Header
