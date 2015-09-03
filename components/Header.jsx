// components/Header.jsx
var React = require('react')
var Router = require('react-router')
var IntroHeader = require('./IntroHeader')
var githubImg = "/" + require('./../images/github.svg')
var twitterImg = "/" + require('./../images/twitter.svg')

var Header = React.createClass({
  render: function () {
    var hi = <div><div className="headshot"></div><div className="hello">Hi, I'm <a href='/'>Lin Clark</a></div></div>;
    var h = (this.props.path == "/") ? <IntroHeader>{hi}</IntroHeader> : {hi};
    return (
      <header>
        {h}
        <div className="find-me">
          <a href="https://twitter.com/linclark"><img src={twitterImg} /></a>
          <span className="divider">&#10731;</span>
          <a href="https://github.com/linclark/"><img src={githubImg} /></a>
        </div>
        <hr />
      </header>
    )
  }
})

module.exports = Header
