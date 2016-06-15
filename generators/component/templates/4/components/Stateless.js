import React from 'react';
import cssmodules from 'react-css-modules';
import styles from '<%= style.webpackPath %>';

function <%= component.className %>() {

  return (
    <div className="<%= style.className %>">
      Please edit <%= component.path %><%= component.fileName %> to update this component!
    </div>
  );
}

<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};

export default cssmodules(<%= component.className %>, styles);
