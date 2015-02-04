'use strict';

var React = require('react/addons');

<% if (stylesLanguage === 'css') { %>require('../../styles/<%= classedFileName %>.css');<% } %><%
if (stylesLanguage === 'sass')   { %>require('../../styles/<%= classedFileName %>.sass');<% } %><%
if (stylesLanguage === 'scss')   { %>require('../../styles/<%= classedFileName %>.scss');<% } %><%
if (stylesLanguage === 'less')   { %>require('../../styles/<%= classedFileName %>.less');<% } %><%
if (stylesLanguage === 'stylus') { %>require('../../styles/<%= classedFileName %>.styl');<% } %>

var <%= classedName %> = React.createClass({
  render: function () {
    return (
        <div>
          <p>Content for <%= classedName %></p>
        </div>
      );
  }
});

<% if (es6) { %>export default <%= classedName %>; <% }
else { %>module.exports = <%= classedName %>; <% } %>

