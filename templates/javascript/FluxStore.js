'use strict';

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var <%= dispatcherName %> = require('../dispatcher/<%= dispatcherName %>');

var <%= classedName %> = assign({}, EventEmitter.prototype, {

});

<%= classedName %>.dispatchToken = <%= dispatcherName %>.register(function(action) {

  switch(action.type) {
    default:
  }

});

<% if (es6) { %> export default <%= classedName %>; <% }
else { %>module.exports = <%= classedName %>; <% } %>
