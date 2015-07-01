'use strict';

describe('<%= classedName %>', () => {
  let React = require('react/addons');
  let <%= scriptAppName %>, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    <%= scriptAppName %> = require('components/<%= scriptAppName %>.js');
    component = React.createElement(<%= scriptAppName %>);
  });

  it('should create a new instance of <%= scriptAppName %>', () => {
    expect(component).toBeDefined();
  });
});
