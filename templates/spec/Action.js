'use strict';

describe('<%= classedName %>', () => {
  let action;

  beforeEach(() => {
    action = require('actions/<%= classedFileName %>.js');
  });

  it('should be defined', () => {
    expect(action).toBeDefined();
  });
});
