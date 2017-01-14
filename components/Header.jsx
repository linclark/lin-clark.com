// components/Header.jsx
var React = require('react')
var Router = require('react-router')
var IntroHeader = require('./IntroHeader')
var githubImg = "/" + require('./../images/github.svg')
var twitterImg = "/" + require('./../images/twitter.svg')

var Header = React.createClass({
  render: function () {
    var hi = <div><div className="headshot"></div><div className="hello">Hi, I'm <a href='/'>Lin Clark</a></div></div>;
    var h = (this.props.path == "/") ? <div className="intro"><p>Hi, I'm Lin Clark.</p><p>I like to code and talk about code.</p></div> : {hi};
    return (
      <header>
        {h}
      </header>
    )
  }
})

module.exports = Header
