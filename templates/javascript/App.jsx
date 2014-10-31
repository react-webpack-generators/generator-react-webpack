/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
var Button = require('react-bootstrap').Button;
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

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
        <Button bsStyle="primary">Like it ?</Button>
      </div>
    );
  }
});
<% if (!reactRouter) {
%>React.renderComponent(<<%= scriptAppName %> />, document.getElementById('content')); // jshint ignore:line
<% } %>
module.exports = <%= scriptAppName %>;
