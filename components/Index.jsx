var React = require('react')
var ContentList = require('./ContentList')
var ContentStore = require('./../stores/ContentStore')

var Index = React.createClass({
  getInitialState: function () {
    return {
      contentList: ContentStore.getContent(5)
    }
  },
  render: function () {
    return (
      <main id="home">
        <div className="card">
          <section>
            <h2>Writing</h2>
            <ContentList contentList={this.state.contentList} />
          </section>
        </div>
      </main>
    )
  }
})

module.exports = Index
