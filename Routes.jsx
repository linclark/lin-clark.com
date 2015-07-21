// Routes.jsx
var React = require('react')
var Router = require('react-router')
var Route = Router.Route
var DefaultRoute = Router.DefaultRoute
var Root = require('./components/Root')
var Index = require('./components/Index')
var Blog = require('./components/Blog')

var Routes = (
  <Route handler={Root} path='/'>
    <DefaultRoute handler={Index} />
    <Route path='/blog/:year/:month/:day/:filename' handler={Blog} />
  </Route>
)

module.exports = Routes
