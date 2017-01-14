var React = require('react')
var ContentList = require('./ContentList')
var ContentStore = require('./../stores/ContentStore')
var selfPortrait = "/" + require('./../images/self-portrait.png')

var Index = React.createClass({
  getInitialState: function () {
    return {
      contentList: ContentStore.getContent(3)
    }
  },
  render: function () {
    return (
      <div>
        <main>
          <div className="self-portrait">
            <img src={selfPortrait} />
          </div>
          <div className="content">
            <section>
              <h2>writing</h2>
              <ContentList contentList={this.state.contentList} />
              <a className="see-all" href="/writing">see all ></a>
            </section>
            <section>
              <h2>speaking</h2>
                <div className="content-list">
                  <ul>
                    <li>
                      <article>
                        <a href="http://slides.com/linclark/webpack/">
                          <h1 className="title">Making small modules actually work with Webpack and npm</h1>
                          <div className="summary">React Rally</div>
                        </a>
                      </article>
                    </li>
                    <li>
                      <article>
                        <a href="http://slides.com/linclark/modularity/">
                          <h1 className="title">The Evolution of Modularity</h1>
                          <div className="summary">NodeDay London</div>
                        </a>
                      </article>
                    </li>
                    <li>
                      <article>
                        <a href="https://www.youtube.com/watch?v=j9Iak-jiFz0">
                          <h1 className="title">Putting it all together</h1>
                          <div className="summary">jQuerySF</div>
                        </a>
                      </article>
                    </li>
                  </ul>
                </div>
            </section>
          </div>
        </main>
      </div>
    )
  }
})

module.exports = Index
