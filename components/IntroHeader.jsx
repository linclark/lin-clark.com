var React = require('react')

var Header = React.createClass({
  render: function () {
    return (
      <div id="intro">
        <p className="hello">Hi, I'm <a href='/'>Lin Clark</a></p>
        <p className="tagline">I code and talk about code.</p>
        <div className="bio">
          <p>I like to contribute. You'll find me writing and talking about things you can do with JavaScript.</p>
          <p>In a past life I worked at npm, developed core modules for Drupal, created MicrodataPHP, and contributed to W3C standardization efforts, among other OSS contributions.</p>
        </div>
      </div>
    )
  }
})

module.exports = Header
