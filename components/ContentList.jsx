var React = require('react')

var ContentList = React.createClass({
  render: function () {
    return (
      <div className="content-list">
        <ul>
          {this.props.contentList.map(function(content) {
            var linkout = <span className="linkout">&nbsp;</span>;
            return <li><article><a href={content.link}>
              <h1 className="title">{content.title}</h1>
              <div className="summary">{content.summary||content.subtitle} {content.type === "linkout" ? linkout : ""}</div>
            </a></article></li>;
          })}
        </ul>
      </div>
    )
  }
})

module.exports = ContentList
