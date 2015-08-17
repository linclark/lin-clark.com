var React = require('react')

var ContentList = React.createClass({
  render: function () {
    return (
      <div className="content-list">
        <ul>
          {this.props.contentList.map(function(content) {
            var linkout = <span className="linkout">&nbsp;</span>;
            return <li><a href={content.link}>
              <div className="title">{content.title}{content.type === "linkout" ? linkout : ""}</div>
              <div className="summary">{content.summary}</div>
            </a></li>;
          })}
        </ul>
      </div>
    )
  }
})

module.exports = ContentList
