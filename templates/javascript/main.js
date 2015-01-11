var <%= scriptAppName %> = require('./<%= scriptAppName %>');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={<%= scriptAppName %>}>
    <Route name="/" handler={<%= scriptAppName %>}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
