var React = require('react')

var ContentList = React.createClass({
  render: function () {
    return (
      <div className="content-list">
        <ul>
          {this.props.contentList.map(function(content) {
            var linkout = <span className="linkout">&nbsp;</span>;
            return <li><a href={content.link}>
              <div className="title">{content.title}</div>
              <div className="summary">{content.summary||content.subtitle} {content.type === "linkout" ? linkout : ""}</div>
            </a></li>;
          })}
        </ul>
      </div>
    )
  }
})

module.exports = ContentList
