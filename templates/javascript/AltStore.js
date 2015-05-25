var alt = require('../alt');

<% if (es6) { %>class <%= classedName %> {
  constructor() {

    this.bindListeners({

    });

  }
} <% }
else { %>var <%= classedName %> = alt.createStore({

  bindListeners: {

  }

}); <% } %>

<% if (es6) { %>export default alt.createStore(<%= classedName %>, '<%= classedName %>'); <% }
else { %>module.exports = <%= classedName %>; <% } %>
