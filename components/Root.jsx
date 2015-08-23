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
          <link rel="stylesheet" href="/base.css" />
          <link rel="stylesheet" media="(min-width: 1000px)" href="/big-screens.css" />
          <link href='http://fonts.googleapis.com/css?family=Muli:400,300' rel='stylesheet' type='text/css' />

          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body id={this.props.path === "/" ? "index" : "subpage"}>
          <Header {...this.props} />
          <RouteHandler {...this.props} />
        </body>
      </html>
    )
  }
})

module.exports = Root
