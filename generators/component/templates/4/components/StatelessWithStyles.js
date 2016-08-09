import React from 'react';
import '<%= style.webpackPath %>';

const <%= component.className %> = () => (
  <div className="<%= style.className %>">
    Please edit <%= component.path %><%= component.fileName %> to update this component!
  </div>
);

<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};

export default <%= component.className %>;
