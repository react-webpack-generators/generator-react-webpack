exports.alias: {
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'<% if(architecture==='flux'||architecture=='reflux') { %>,
      'stores': __dirname + '/src/stores/',
      'actions': __dirname + '/src/actions/'<% } %>
    }

exports.entry = './src/components/<% if (reactRouter) { %>main<% } else { %><%= scriptAppName %><% } %>.js';
