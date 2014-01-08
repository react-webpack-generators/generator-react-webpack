/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react/addons');

var <%= classedName %> = React.createClass({
  /*jshint ignore:start */
  render: function () {
    return (
        <div>
          <p>Content for <%= classedName %></p>
        </div>
      )
  }
  /*jshint ignore:end */
});

module.exports = <%= classedName %>;
