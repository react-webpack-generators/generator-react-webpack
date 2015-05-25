var alt = require('../alt');

<% if (es6) { %>class <%= classedName %> {

}; <% }
else { %>var <%= classedName %> = alt.createActions(function () {

}); <% } %>

<% if (es6) { %>export default alt.createActions(<%= classedName %>); <% }
else { %>module.exports = <%= classedName %>; <% } %>
