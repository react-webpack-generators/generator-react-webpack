'use strict';

var React = require('react/addons');
var ReactTransitionGroup = React.addons.TransitionGroup;

<% if(architecture === 'flux' || architecture === 'reflux'){%>
var req = require.context("stores", true, /^(.*\.(js$))[^.]*$/igm);
req.keys().forEach((key)=>{
	req(key);
});<%}%>

// CSS
require('normalize.css');
require('../styles/main.css');

var imageURL = require('../images/yeoman.png');

var <%= scriptAppName %> = React.createClass({
  render: function() {
    return (
      <div className="main">
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
