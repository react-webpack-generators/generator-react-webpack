'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// CSS
require('normalize.css');
require('../styles/main.css');

var imageURL = require('../images/yeoman.png');

class <%= scriptAppName %> extends React.Component {
  render() {
    return (
      <div className="main">
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
        </ReactTransitionGroup>
      </div>
    );
  }
};
<% if (!reactRouter) {
%>React.render(<<%= scriptAppName %> />, document.getElementById('content')); // jshint ignore:line
<% } %>
export default <%= scriptAppName %>;
