'use strict';
let expect = require('chai').expect;
let path = require('path');

let utils = require('../../utils/yeoman');
let baseDir = path.basename(process.cwd());

describe('Utilities:Yeoman', () => {

  describe('#getBaseDir', () => {

    it('should return the current run directory', () => {
      expect(utils.getBaseDir()).to.equal(baseDir);
    });
  });

  describe('#getCleanedPathName', () => {

    it('should return normalized paths', () => {

      let tests = {
        'my/full œ!/path!': 'my/full/path',
        'Test': 'test',
        'I am a Test Component!': 'iAmATestComponent',
        'A very\^specialChary!@componentName with !!!': 'aVerySpecialCharyComponentNameWith'
      };

      for(let test in tests) {
        expect(utils.getCleanedPathName(test)).to.be.equal(tests[test]);
        expect(utils.getCleanedPathName(test, 'suffix')).to.be.equal(tests[test] + 'Suffix');
      }
    });
  });

  describe('#getAppName', () => {

    it('should return a js friendly application name', () => {
      let result = utils.getAppName('this is a test using % special / chars!');
      expect(result).to.be.equal('this-is-a-test-using-special-chars');
    });

    it('should use the current path for creating the appName if the argument is omitted', () => {

      let resultWithoutArgs = utils.getAppName();
      let resultWithArgs = utils.getAppName(baseDir);

      expect(resultWithoutArgs).to.be.equal(resultWithArgs);
    });
  });

  describe('#getComponentStyleName', () => {

    it('should return a components css className', () => {

      let tests = {
        'my/full œ!/path!': 'path-component',
        'Test': 'test-component',
        'I am a Test Component!': 'i-am-a-test-component-component',
        'A very\^specialChary!@componentName with !!!': 'a-very-specialchary-componentname-with-component'
      };

      for(let test in tests) {
        expect(utils.getComponentStyleName(test)).to.be.equal(tests[test]);
      }
    });
  });

  describe('#getAllSettingsFromComponentName', () => {

    it('should get all required information for component creation from the components name', () => {

      let expection = {
        style: {
          webpackPath: 'styles/my/component/Test.css',
          path: 'src/styles/my/component/',
          fileName: 'Test.css',
          className: 'test-component',
          suffix: '.css'
        },
        component: {
          webpackPath: 'components/my/component/TestComponent.js',
          path: 'src/components/my/component/',
          fileName: 'TestComponent.js',
          className: 'TestComponent',
          displayName: 'MyComponentTestComponent',
          suffix: '.js'
        },
        test: {
          path: 'test/components/my/component/',
          fileName: 'TestComponentTest.js'
        }
      };

      expect(utils.getAllSettingsFromComponentName('my/component/test')).to.deep.equal(expection);
    });
  });

  describe('#getDestinationPath', () => {

    it('should return the correct filesystem path for all components', () => {

      expect(utils.getDestinationPath('test', 'action', 'Actions')).to.equal('src/actions/TestActions.js');
      expect(utils.getDestinationPath('subfolder/test', 'action', 'Actions')).to.equal('src/actions/subfolder/TestActions.js');

      expect(utils.getDestinationPath('test', 'source', 'Source')).to.equal('src/sources/TestSource.js');
      expect(utils.getDestinationPath('subfolder/test', 'source', 'Source')).to.equal('src/sources/subfolder/TestSource.js');

      expect(utils.getDestinationPath('test', 'store', 'Store')).to.equal('src/stores/TestStore.js');
      expect(utils.getDestinationPath('subfolder/test', 'store', 'Store')).to.equal('src/stores/subfolder/TestStore.js');
    });
  });

  describe('#getDestinationClassName', () => {

    it('should return the correct javascript class name for the given paths', () => {
      expect(utils.getDestinationClassName('test', 'action', 'Actions')).to.equal('TestActions');
      expect(utils.getDestinationClassName('test', 'source', 'Source')).to.equal('TestSource');
      expect(utils.getDestinationClassName('test', 'store', 'Store')).to.equal('TestStore');
    });
  });
});
