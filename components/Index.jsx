var React = require('react')
var ContentList = require('./ContentList')
var ContentStore = require('./../stores/ContentStore')

var Index = React.createClass({
  getInitialState: function () {
    return {
      contentList: ContentStore.getContent(8)
    }
  },
  render: function () {
    return (
      <main>
        <ContentList contentList={this.state.contentList} />
      </main>
    )
  }
})

module.exports = Index
