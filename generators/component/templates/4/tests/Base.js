import React from 'react';
import { shallow } from 'enzyme';
import <%= component.className %> from '<%= component.webpackPath %>';

describe('<<%= component.className %> />', () => {

  let component;
  beforeEach(() => {
    component = shallow(<%= component.className %>);
  });

  describe('when rendering the component', () => {

    it('should have a className of "index"', () => {
      expect(component.hasClass('<%= style.className %>')).to.equal(true);
    });
  });
});
