'use strict';

describe('<%= classedName %>', function () {
  var <%= classedName %>, component;

  beforeEach(function () {
    <%= classedName %> = require('../../../src/scripts/components/<%= classedName %>');
    component = <%= classedName %>();
  });

  it('should create a new instance of <%= classedName %>', function () {
    expect(component).toBeDefined();
  });
});
