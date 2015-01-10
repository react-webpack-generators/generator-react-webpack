'use strict';

describe('<%= classedName %>', function () {
  var React = require('react/addons');
  var <%= classedName %>, component;

  beforeEach(function () {
    <%= classedName %> = require('../../../src/scripts/components/<%= classedFileName %>.js');
    component = React.createElement(<%= classedName %>);
  });

  it('should create a new instance of <%= classedName %>', function () {
    expect(component).toBeDefined();
  });
});
