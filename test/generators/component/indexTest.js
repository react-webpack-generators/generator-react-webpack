'use strict';
let path = require('path');
let assert = require('yeoman-generator').assert;
let helpers = require('yeoman-generator').test

describe('react-webpack:component', () => {

  let generatorComponent = path.join(__dirname, '../../../generators/component');

  // List of available style types. Please add a line that says
  // testComponentWithStyle(styleTypes.KEY); to the bottom of the file
  // to run all unit tests for this filetype.
  const styleTypes = {
    css: {
      type: 'css',
      fileName: 'src/styles/Mycomponent.css',
      expandedFileName: 'src/styles/my/littleSpecial/Test.css',
      assertions: {
        componentImport: 'require(\'styles//Mycomponent.css\');',
        styleContent: '.mycomponent-component'
      }
    },
    sass: {
      type: 'sass',
      fileName: 'src/styles/Mycomponent.sass',
      expandedFileName: 'src/styles/my/littleSpecial/Test.sass',
      assertions: {
        componentImport: 'require(\'styles//Mycomponent.sass\');',
        styleContent: '.mycomponent-component'
      }
    },
    scss: {
      type: 'scss',
      fileName: 'src/styles/Mycomponent.scss',
      expandedFileName: 'src/styles/my/littleSpecial/Test.scss',
      assertions: {
        componentImport: 'require(\'styles//Mycomponent.scss\');',
        styleContent: '.mycomponent-component'
      }
    },
    less: {
      type: 'less',
      fileName: 'src/styles/Mycomponent.less',
      expandedFileName: 'src/styles/my/littleSpecial/Test.less',
      assertions: {
        componentImport: 'require(\'styles//Mycomponent.less\');',
        styleContent: '.mycomponent-component'
      }
    },
    stylus: {
      type: 'stylus',
      fileName: 'src/styles/Mycomponent.styl',
      expandedFileName: 'src/styles/my/littleSpecial/Test.styl',
      assertions: {
        componentImport: 'require(\'styles//Mycomponent.styl\');',
        styleContent: '.mycomponent-component'
      }
    }
  };

  /**
   * Return a newly generated component with given name and style
   * @param {String} name Name of the component
   * @param {String} styleType Styling language to use
   * @param {Object} options Options to use for the generator
   * @param {Function} callback Test callback to run
   */
  function createGeneratedComponent(name, styleType, options, callback) {
    helpers.run(generatorComponent)
      .withArguments([name])
      .withOptions(options)
      .on('ready', (instance) => {
        instance.config.set('style', styleType);
      })
      .on('end', callback);
  }

  /**
   * Test a component with styling applied
   * @param {Object} style The style to apply (see styleTypes above)
   * @param {Object} options Options to use [optional]
   */
  function testComponentWithStyle(style, options) {

    // Make sure we always have options
    if(!options) {
      options = {};
    }

    describe(`When using style type "${style.type}"`, () => {

      describe('When writing is called', () => {

        it(`should create the react component, its ${style.type}-stylesheet and test file`, (done) => {
          createGeneratedComponent('mycomponent', style.type, options, () => {

            assert.file([
              'src/components/MycomponentComponent.js',
              style.fileName,
              'test/components/MycomponentComponentTest.js'
            ]);
            done();
          });
        });
      });

      describe('When creating a component', () => {

        it('should always import REACT', (done) => {
          createGeneratedComponent('mycomponent', style.type, options, () => {
            assert.fileContent('src/components/MycomponentComponent.js', `import React from 'react';`);
            done();
          });
        });

        it(`should require the created ${style.type} file`, (done) => {
          createGeneratedComponent('mycomponent', style.type, options, () => {
            assert.fileContent('src/components/MycomponentComponent.js', style.assertions.componentImport);
            done();
          });
        });

        it('should have its displayName set per default', (done) => {
          createGeneratedComponent('mycomponent', style.type, options, () => {
            assert.fileContent('src/components/MycomponentComponent.js', `displayName = 'MycomponentComponent';`);
            done();
          });
        });

        it('should export the created component', (done) => {
          createGeneratedComponent('mycomponent', style.type, options, () => {
            assert.fileContent('src/components/MycomponentComponent.js', `export default MycomponentComponent`);
            done();
          });
        });

        it(`should be possible to create components in a subfolder`, (done) => {
          createGeneratedComponent('my/little !special/test', style.type, options, () => {

            assert.file([
              'src/components/my/littleSpecial/TestComponent.js',
              style.expandedFileName,
              'test/components/my/littleSpecial/TestComponentTest.js'
            ]);
            done();
          });
        });
      });

      describe('Style', () => {

        it(`should add the components ${style.type} class to the stylesheet`, (done) => {
          createGeneratedComponent('mycomponent', style.type, options, () => {
            assert.fileContent(style.fileName, style.assertions.styleContent);
            done();
          });
        });
      });

      describe('Test', () => {

        it('should import the react component', (done) => {
          createGeneratedComponent('mycomponent', style.type, options, () => {
            assert.fileContent('test/components/MycomponentComponentTest.js', 'import MycomponentComponent from \'components//MycomponentComponent.js\';');
            done();
          });
        });
      });
    });
  }

  // Run all tests for all available style types.
  testComponentWithStyle(styleTypes.css);
  testComponentWithStyle(styleTypes.sass);
  testComponentWithStyle(styleTypes.scss);
  testComponentWithStyle(styleTypes.less);
  testComponentWithStyle(styleTypes.stylus);

  // Test stateless components (should be enough when testing with defaults)
  testComponentWithStyle(styleTypes.css, { stateless: true });
});
