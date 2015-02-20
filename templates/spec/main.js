'use strict';

describe('main', function () {
  var main, component;

  beforeEach(function () {
    main = require('components/main.jsx');
    component = main();
  });

  it('should create a new instance of main', function () {
    expect(component).toBeDefined();
  });
});
