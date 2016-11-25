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

    describe('when the generator version is set to 4', () => {

      const expectionNamespaced = {
        style: {
          webpackPath: './test.cssmodule.css',
          path: 'src/components/my/component/',
          fileName: 'test.cssmodule.css',
          className: 'test-component',
          suffix: '.css'
        },
        component: {
          webpackPath: 'components/my/component/Test.js',
          path: 'src/components/my/component/',
          fileName: 'Test.js',
          className: 'Test',
          classBase: 'React.Component',
          displayName: 'MyComponentTest',
          suffix: '.js'
        },
        test: {
          path: 'test/components/my/component/',
          fileName: 'TestTest.js'
        }
      };

      const expectionRoot = {
        style: {
          webpackPath: './test.cssmodule.css',
          path: 'src/components/',
          fileName: 'test.cssmodule.css',
          className: 'test-component',
          suffix: '.css'
        },
        component: {
          webpackPath: 'components/Test.js',
          path: 'src/components/',
          fileName: 'Test.js',
          className: 'Test',
          classBase: 'React.Component',
          displayName: 'Test',
          suffix: '.js'
        },
        test: {
          path: 'test/components/',
          fileName: 'TestTest.js'
        }
      };

      it('should get all required information for component creation from the components name', () => {
        expect(utils.getAllSettingsFromComponentName('my/component/test', 'css', true, false, 4, '')).to.deep.equal(expectionNamespaced);
      });

      it('should prepend a prefix to the style.className attribute', () => {
        const expectation = Object.assign({}, expectionNamespaced);
        expectation.style.className = 'myapp-test-component';
        expect(utils.getAllSettingsFromComponentName('my/component/test', 'css', true, false, 4, 'myapp-')).to.deep.equal(expectation);
      });

      it('should build path information wo/ two slashes when dealing with a non-namespaced component', () => {
        expect(utils.getAllSettingsFromComponentName('test', 'css', true, false, 4, '')).to.deep.equal(expectionRoot);
      });
    });

    describe('when the generator version is set to 3 (or not set at all)', () => {

      const expection = {
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

      it('should get all required information for component creation from the components name', () => {
        expect(utils.getAllSettingsFromComponentName('my/component/test')).to.deep.equal(expection);
        expect(utils.getAllSettingsFromComponentName('my/component/test', 'css', false, 3)).to.deep.equal(expection);
      });
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

  describe('#getComponentTemplateName', () => {

    it('should return a stateless component with styles if stateless is set to true and useStyles set to true', () => {
      expect(utils.getComponentTemplateName(true, true)).to.equal('StatelessWithStyles.js');
    });

    it('should return a stateless component without styles if stateless is set to true and useStyles set to false', () => {
      expect(utils.getComponentTemplateName(true, false)).to.equal('StatelessNoStyles.js');
    });

    it('should return a statefull component with styles if stateless is set to false and useStyles set to true', () => {
      expect(utils.getComponentTemplateName(false, true)).to.equal('StatefulWithStyles.js');
    });

    it('should return a statefull component without styles if stateless is set to false and useStyles set to false', () => {
      expect(utils.getComponentTemplateName(false, false)).to.equal('StatefulNoStyles.js');
    });

    it('should return a statefull component with styles and cssmodules if stateless is set to false and useCssModules set to true', () => {
      expect(utils.getComponentTemplateName(false, true, true)).to.equal('StatefulCssModules.js');
    });
  });
});
