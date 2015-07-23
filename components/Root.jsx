// components/Root.jsx
var React = require('react')
var Router = require('react-router')
var RouteHandler = Router.RouteHandler
var Header = require('./Header')

var Root = React.createClass({
  render: function () {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <link rel="stylesheet" href="/styles.css" />
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
