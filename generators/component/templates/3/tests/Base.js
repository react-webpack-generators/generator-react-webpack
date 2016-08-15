/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0 */
'use strict';

// Uncomment the following lines to use the react test utilities
// import TestUtils from 'react-addons-test-utils';
import createComponent from 'helpers/shallowRenderHelper';

import <%= component.className %> from '<%= component.webpackPath %>';

describe('<%= component.className %>', function () {
  let component;

  beforeEach(function () {
    component = createComponent(<%= component.className %>);
  });

  it('should have its component name as default className', function () {
    expect(component.props.className).to.equal('<%= style.className %>');
  });
});
