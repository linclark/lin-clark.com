var React = require('react')
var ContentList = require('./ContentList')
var ContentStore = require('./../stores/ContentStore')

var Index = React.createClass({
  getInitialState: function () {
    return {
      contentList: ContentStore.getContent(3)
    }
  },
  render: function () {
    return (
      <main id="home">
        <section>
          <h2>writing</h2>
          <ContentList contentList={this.state.contentList} />
          <a className="see-all" href="/writing">see all ></a>
        </section>
        <section>
          <h2>speaking</h2>
            <div className="content-list">
              <ul>
                <li><a href="http://slides.com/linclark/webpack/">
                  <div className="title">Making small modules actually work with Webpack and npm</div>
                  <div className="summary">React Rally</div>
                </a></li>
                <li><a href="http://slides.com/linclark/modularity/">
                  <div className="title">The Evolution of Modularity</div>
                  <div className="summary">NodeDay London</div>
                </a></li>
                <li><a href="https://www.youtube.com/watch?v=j9Iak-jiFz0">
                  <div className="title">Putting it all together</div>
                  <div className="summary">jQuerySF</div>
                </a></li>
              </ul>
            </div>
        </section>
      </main>
    )
  }
})

module.exports = Index
