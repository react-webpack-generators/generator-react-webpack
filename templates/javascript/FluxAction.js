'use strict';

var <%= classedName %> = {

}

<% if (es6) { %> export default <%= classedName %>; <% }
else { %>module.exports = <%= classedName %>; <% } %>
