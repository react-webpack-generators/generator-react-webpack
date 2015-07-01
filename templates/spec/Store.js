'use strict';

describe('<%= classedName %>', () => {
  let store;

  beforeEach(() => {
    store = require('stores/<%= classedFileName %>.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
