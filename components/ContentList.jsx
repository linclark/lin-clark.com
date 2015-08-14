var React = require('react')

var ContentList = React.createClass({
  render: function () {
    return (
      <div className="content-list">
        <ul>
          {this.props.contentList.map(function(content) {
            return <li><a href={content.link}><div>{content.title}</div>
              <div>{content.summary}</div>
            </a></li>;
          })}
        </ul>
      </div>
    )
  }
})

module.exports = ContentList
