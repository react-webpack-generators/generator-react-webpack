'use strict';

describe('main', () => {
  let main, component;

  beforeEach(() => {
    main = require('components/main.jsx');
    component = main();
  });

  it('should create a new instance of main', () => {
    expect(component).toBeDefined();
  });
});
