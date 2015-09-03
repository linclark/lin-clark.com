var React = require('react')
var Router = require('react-router')
var Route = Router.Route
var DefaultRoute = Router.DefaultRoute
var Root = require('./components/Root')
var Index = require('./components/Index')
var BlogPost = require('./components/BlogPost')
var WritingArchive = require('./components/WritingArchive')

var Routes = (
  <Route handler={Root} path='/'>
    <DefaultRoute handler={Index} />
    <Route path='/blog/:year/:month/:day/:filename' handler={BlogPost} />
    <Route path='/writing' handler={WritingArchive} />
  </Route>
)

module.exports = Routes
