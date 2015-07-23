'use strict';

var React = require('react/addons');
<% if (stylesLanguage === 'css')    { %>require('styles/<%= classedFileName %>.css'); <% } %>
<% if (stylesLanguage === 'sass')   { %>require('styles/<%= classedFileName %>.sass');<% } %>
<% if (stylesLanguage === 'scss')   { %>require('styles/<%= classedFileName %>.scss');<% } %>
<% if (stylesLanguage === 'less')   { %>require('styles/<%= classedFileName %>.less');<% } %>
<% if (stylesLanguage === 'stylus') { %>require('styles/<%= classedFileName %>.styl');<% } %>

var <%= classedName %> = React.createClass({<% if(rich){%>
  mixins: [],
  getInitialState: function() {
    return {};
  },
  getDefaultProps: function() {},
  componentWillMount: function() {},
  componentDidMount: function() {},
  shouldComponentUpdate: function() {},
  componentDidUpdate: function() {},
  componentWillUnmount: function() {},<%}%>

  render: function () {
    return (
        <div className="<%= classedName %>">
          <p>Content for <%= classedName %></p>
        </div>
      );
  }
});

<% if (es6) { %>export default <%= classedName %>;<% }
else { %>module.exports = <%= classedName %>;<% } %>
