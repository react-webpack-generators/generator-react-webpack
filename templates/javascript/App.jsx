/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
<% if (bootstrap) { %>
var Button = require('react-bootstrap').Button;
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
<% } %>
var ReactTransitionGroup = React.addons.TransitionGroup;

// Export React so the devtools can find it
(window !== window.top ? window.top : window).React = React;

// CSS
require('../../styles/normalize.css');
require('../../styles/main.css');

var imageURL = require('../../images/yeoman.png');

var <%= scriptAppName %> = React.createClass({
  render: function() {
    return <div className='main'>
        <ReactTransitionGroup transitionName="fade">
          <img src={imageURL} />
        </ReactTransitionGroup>
        <% if (bootstrap) { %>
        <ButtonToolbar>
          <Button>Default</Button>
          <Button bsStyle="primary">Primary</Button>
          <Button bsStyle="success">Success</Button>
          <Button bsStyle="info">Info</Button>
          <Button bsStyle="warning">Warning</Button>
          <Button bsStyle="danger">Danger</Button>
          <Button bsStyle="link">Link</Button>
        </ButtonToolbar>
        <% } %>
        <% if (fontawesome) { %>
        <i className="fa fa-heart"></i>
        <% } %>
      </div>;
  }
});
<% if (!reactRouter) {
%>React.renderComponent(<<%= scriptAppName %> />, document.getElementById('content')); // jshint ignore:line
<% } %>
module.exports = <%= scriptAppName %>;
