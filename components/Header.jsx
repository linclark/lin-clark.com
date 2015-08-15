// components/Header.jsx
var React = require('react')
var Router = require('react-router')
var fittext = require('raw!./../node_modules/fittext/fittext.js')

var Header = React.createClass({
  render: function () {
    return (
      <header>
        <div id="intro">
          <p className='resize'>Hi, I'm <a href='/'>Lin Clark</a></p>
          <p className='resize2'>I code and talk about code.</p>
          <p>I like to contribute. You'll find me writing and talking about things you can do with JavaScript.</p>
          <p>In a past life I worked at npm, developed core modules for Drupal, created MicrodataPHP, and contributed to W3C standardization efforts, among other OSS contributions.</p>
        </div>
        <script dangerouslySetInnerHTML={{ __html: fittext.toString() + `var el = document.querySelector('#intro .resize'); window.fitText(el); var el2 = document.querySelector('#intro .resize2'); window.fitText(el2, 1.3)`}}></script>
      </header>
    )
  }
})

module.exports = Header
