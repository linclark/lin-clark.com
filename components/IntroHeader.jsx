var React = require('react')

var Header = React.createClass({
  render: function () {
    return (
      <div id="intro">
        <div className="headshot"></div>
        {this.props.children}
        <p className="tagline">I code and talk about code.</p>
        <div className="bio">
          <p>I like to contribute. You'll find me writing and talking about things you can do with JavaScript.</p>
          <p>In a past life I worked at npm, developed core modules for Drupal, created MicrodataPHP, and contributed to W3C standardization efforts, among other OSS contributions.</p>
        </div>
        <div className="find-me">
          <a href="https://twitter.com/linclark"><img src="/images/twitter.svg" /></a>
          <span className="divider">&#10731;</span>
          <a href="https://github.com/linclark/"><img src="/images/github.svg" /></a>
        </div>
        <hr />
      </div>
    )
  }
})

module.exports = Header
