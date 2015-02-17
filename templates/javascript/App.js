'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
window.top.React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');

var <%= scriptAppName %> = React.createClass({
  render: function() {
    return (
      <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
        </ReactTransitionGroup>
      </div>
    );
  }
});
<% if (!reactRouter) {
%>React.render(<<%= scriptAppName %> />, document.getElementById('content')); // jshint ignore:line
<% } %>
module.exports = <%= scriptAppName %>;
