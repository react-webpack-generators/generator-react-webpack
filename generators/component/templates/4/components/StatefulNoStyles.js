import React from 'react';

class <%= component.className %> extends <%= component.classBase %> {

  render() {
    return (
      <div className="<%= style.className %>">
        Please edit <%= component.path %><%= component.fileName %> to update this component!
      </div>
    );
  }
}

<%= component.className %>.displayName = '<%= component.displayName %>';
<%= component.className %>.propTypes = {};
<%= component.className %>.defaultProps = {};

export default <%= component.className %>;
