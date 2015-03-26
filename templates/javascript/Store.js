'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var <%= dispatcherName %> = require('../dispatcher/<%= dispatcherName %>');

var <%= classedName + 'Store' %> = assign({}, EventEmitter.prototype, {

});

<%= classedName + 'Store' %>.dispatchToken = <%= dispatcherName %>.register(function(action) {

  switch(action.type) {
    default:
  }

});

<% if (es6) { %> export default <%= classedName + 'Store' %>; <% }
else { %>module.exports = <%= classedName + 'Store' %>; <% } %>
