'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import <%= classedName %> from 'components/<%= classedFileName %><%= reactComponentSuffix %>';

describe('<%= classedName %>', () => {
    let <%= classedName %>Component;

    beforeEach(() => {
        <%= classedName %>Component = createComponent(<%= classedName %>);
    });

    it('should have its component name as default className', () => {
        expect(<%= classedName %>Component._store.props.className).toBe('<%= classedName %>');
    });
});
