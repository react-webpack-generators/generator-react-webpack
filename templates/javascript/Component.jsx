/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');
require('../../styles/<%= classedName %>.css');

var <%= classedName %> = React.createClass({
  render: function () {
    return (
        <div>
          <p>Content for <%= classedName %></p>
        </div>
      );
  }
});

module.exports = <%= classedName %>;
