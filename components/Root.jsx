// components/Root.jsx
var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var css = require('../css/base.css')
var Header = require('./Header')

var Root = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <style dangerouslySetInnerHTML={{ __html: css }} />
        </head>
        <body>
          <Header />
          <RouteHandler {...this.props} />
        </body>
      </html>
    )
  }
})

module.exports = Root
