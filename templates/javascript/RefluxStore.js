'use strict';

var Reflux = require('reflux');
//var Actions = require('actions/..');


var <%= classedName %> = Reflux.createStore({
  listenables: Actions,


});

<% if (es6) { %> export default <%= classedName %>; <% }
  else { %>module.exports = <%= classedName %>; <% } %>
