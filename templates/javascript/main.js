var <%= scriptAppName %> = require('./<%= scriptAppName %>');
var React = require('react');
var {DefaultRoute, Route, Routes} = require('react-router');

React.renderComponent((
  <Routes location="history">
    <Route path="/" handler={<%= scriptAppName %>}>
    </Route>
  </Routes>
), document.getElementById('content'));
