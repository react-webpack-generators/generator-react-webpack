'use strict';

import React from 'react';

require('<%= style.webpackPath %>');

let <%= component.className %> = (props) => (
  <div className="<%= style.className %>">
    Please edit <%= component.path %>/<%= component.fileName %> to update this component!
  </div>
);

<%= component.className %>.displayName = '<%= component.displayName %>';

// Uncomment properties you need
// <%= component.className %>.propTypes = {};
// <%= component.className %>.defaultProps = {};

export default <%= component.className %>;
