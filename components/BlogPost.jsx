var React = require('react')
var ContentStore = require('./../stores/ContentStore')
var Comments = require('./Comments')

var BlogPost = React.createClass({
  getInitialState: function () {
    var {year, month, day, filename} = this.props.params;
    return ContentStore.getPost('blog', year, month, day, filename)
  },
  render: function () {
    return (
      <main>
        <div className="card">
          <header>
            <h1>{this.state.title}</h1>
            <p>{this.state.summary||this.state.subtitle}</p>
          </header>
          <div dangerouslySetInnerHTML={{ __html: this.state.__content }}></div>
        </div>
        <Comments />
      </main>
    )
  }
})

module.exports = BlogPost
