'use strict';

var React = require('react/addons');
<% if(stylePath) { %>require('<%= stylePath %>');<% } %>

class <%= classedName %> extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="<%= classedName %>">
        <p>Content for <%= classedName %></p>
      </div>
    );
  }<% if(rich) { %>
  componentWillMount() {}
  componentDidMount() {}
  shouldComponentUpdate() {}
  componentDidUpdate() {}
  componentWillUnmount() {}<% } %>
}<% if(rich) { %>
<%= classedName %>.propTypes = {};
<%= classedName %>.defaultProps = {};<% } %>

export default <%= classedName %>;
