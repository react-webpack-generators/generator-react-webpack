import React from 'react';<% if(componentHasStyles) { %>
import cssmodules from 'react-css-modules';
import styles from '<%= style.webpackPath %>';<% } %>

const <%= component.className %> = () => {

  return (
    <div className="<%= style.className %>" styleName="<%= style.className %>">
      Please edit <%= component.path %><%= component.fileName %> to update this component!
    </div>
  );
};

<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};

<% if(componentHasStyles) { %>export default cssmodules(<%= component.className %>, styles);<%
} else {
%>export default <%= component.className %>;<% } %>
