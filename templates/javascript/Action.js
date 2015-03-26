'use strict';

var <% classedName + 'ActionCreators' %> = {

}

<% if (es6) { %> export default <%= classedName + 'ActionCreators' %>; <% }
else { %>module.exports = <%= classedName + 'ActionCreators' %>; <% } %>
