'use strict';

describe('<%= classedName %>', function() {
  var action;

  beforeEach(function() {
    action = require('actions/<%= classedFileName %>.js');
  });

  it('should be defined', function() {
    expect(action).toBeDefined();
  });
});
