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
          <link href='http://fonts.googleapis.com/css?family=Muli:400,300' rel='stylesheet' type='text/css' />
        </head>
        <body id={this.props.path === "/" ? "index" : ""}>
          <Header {...this.props} />
          <RouteHandler {...this.props} />
        </body>
      </html>
    )
  }
})

module.exports = Root
