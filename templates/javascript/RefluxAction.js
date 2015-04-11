'use strict';

var Reflux = require('reflux');

var <%= classedName %>  =  Reflux.createActions([

]);


<% if (es6) { %> export default <%= classedName %>; <% }
else { %>module.exports = <%= classedName %>; <% } %>
