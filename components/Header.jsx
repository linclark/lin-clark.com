// components/Header.jsx
var React = require('react')
var Router = require('react-router')

var Header = React.createClass({
  render: function () {
    return (
      <header>
        <div id="intro">
          <p>Hi, I'm <a href='/'>Lin Clark</a></p>
          <p>I code and talk about code.</p>
          <p>I like to contribute. You'll find me writing and talking about things you can do with JavaScript.</p>
          <p>In a past life I worked at npm, developed core modules for Drupal, created MicrodataPHP, and contributed to W3C standardization efforts, among other OSS contributions.</p>
        </div>
      </header>
    )
  }
})

module.exports = Header
