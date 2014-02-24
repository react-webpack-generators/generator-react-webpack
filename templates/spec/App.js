'use strict';

describe('<%= classedName %>', function () {
  var <%= scriptAppName %>, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    <%= scriptAppName %> = require('../../../src/scripts/components/<%= scriptAppName %>');
    component = <%= scriptAppName %>();
  });

  it('should create a new instance of <%= scriptAppName %>', function () {
    expect(component).toBeDefined();
  });
});
