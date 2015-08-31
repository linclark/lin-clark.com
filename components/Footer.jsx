var React = require("react")

var Footer = React.createClass({
  render: function () {
    return (<script dangerouslySetInnerHTML={googleAnalytics()}></script>);
  }
})

function googleAnalytics() {
  return {__html: `var _gaq=[["_setAccount","UA-8334912-1"],["_trackPageview"]];
    (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];g.async=1;
    g.src=("https:"==location.protocol?"//ssl":"//www")+".google-analytics.com/ga.js";
    s.parentNode.insertBefore(g,s)}(document,"script"));`};
}

module.exports = Footer
