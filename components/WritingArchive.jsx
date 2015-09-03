var React = require('react')
var ContentStore = require('./../stores/ContentStore')
var ContentList = require("./../components/ContentList")

var WritingArchive = React.createClass({
  getInitialState: function () {
    return {
      contentList: ContentStore.getContent()
    }
  },
  render: function () {
    return (
      <main>
        <h1>Writing</h1>
        <ContentList contentList={this.state.contentList} />
      </main>
    )
  }
})

module.exports = WritingArchive
