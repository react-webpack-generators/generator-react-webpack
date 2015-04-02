'use strict';

describe('<%= classedName %>', function() {
  var store;

  beforeEach(function() {
    store = require('stores/<%= classedFileName %>.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
