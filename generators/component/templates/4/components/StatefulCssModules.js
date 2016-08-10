import React from 'react';
import cssmodules from 'react-css-modules';
import styles from '<%= style.webpackPath %>';

class <%= component.className %> extends <%= component.classBase %> {

  render() {
    return (
      <div className="<%= style.className %>" styleName="<%= style.className %>">
        Please edit <%= component.path %><%= component.fileName %> to update this component!
      </div>
    );
  }
}

<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};

export default cssmodules(<%= component.className %>, styles);
