'use strict';
let path = require('path');
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');


describe('react-webpack:component', () => {

  const generatorComponent = path.join(__dirname, '../../../generators/component');

  describe('when using version 3 of the generator', () => {

    // List of available style types. Please add a line that says
    // testComponentWithStyle(styleTypes.KEY); to the bottom of the file
    // to run all unit tests for this filetype.
    const styleTypes = {
      css: {
        type: 'css',
        fileName: 'src/styles/Mycomponent.css',
        expandedFileName: 'src/styles/my/littleSpecial/Test.css',
        assertions: {
          componentImport: 'require(\'styles/Mycomponent.css\');',
          styleContent: '.mycomponent-component'
        }
      },
      sass: {
        type: 'sass',
        fileName: 'src/styles/Mycomponent.sass',
        expandedFileName: 'src/styles/my/littleSpecial/Test.sass',
        assertions: {
          componentImport: 'require(\'styles/Mycomponent.sass\');',
          styleContent: '.mycomponent-component'
        }
      },
      scss: {
        type: 'scss',
        fileName: 'src/styles/Mycomponent.scss',
        expandedFileName: 'src/styles/my/littleSpecial/Test.scss',
        assertions: {
          componentImport: 'require(\'styles/Mycomponent.scss\');',
          styleContent: '.mycomponent-component'
        }
      },
      less: {
        type: 'less',
        fileName: 'src/styles/Mycomponent.less',
        expandedFileName: 'src/styles/my/littleSpecial/Test.less',
        assertions: {
          componentImport: 'require(\'styles/Mycomponent.less\');',
          styleContent: '.mycomponent-component'
        }
      },
      stylus: {
        type: 'stylus',
        fileName: 'src/styles/Mycomponent.styl',
        expandedFileName: 'src/styles/my/littleSpecial/Test.styl',
        assertions: {
          componentImport: 'require(\'styles/Mycomponent.styl\');',
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
          instance.config.set('generatedWithVersion', 3);
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

      describe(`when using style type "${style.type}"`, () => {

        describe('when writing is called', () => {

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

        describe('when creating a component', () => {

          it('should always import REACT', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('src/components/MycomponentComponent.js', 'import React from \'react\';');
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
              assert.fileContent('src/components/MycomponentComponent.js', 'displayName = \'MycomponentComponent\';');
              done();
            });
          });

          it('should export the created component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('src/components/MycomponentComponent.js', 'export default MycomponentComponent');
              done();
            });
          });

          it('should be possible to create components in a subfolder', (done) => {
            createGeneratedComponent('my/little !special/test', style.type, options, () => {

              assert.file([
                'src/components/my/littleSpecial/TestComponent.js',
                style.expandedFileName,
                'test/components/my/littleSpecial/TestComponentTest.js'
              ]);
              done();
            });
          });

          it(`should add the components ${style.type} class to the created stylesheet`, (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent(style.fileName, style.assertions.styleContent);
              done();
            });
          });

          it('should create a unit test that imports the generated component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('test/components/MycomponentComponentTest.js', 'import MycomponentComponent from \'components/MycomponentComponent.js\';');
              done();
            });
          });
        });
      });
    }

    // Run all tests for all available style types.
    // Stateless components will also be tested!
    for(const style in styleTypes) {
      testComponentWithStyle(styleTypes[style]);
      testComponentWithStyle(styleTypes[style], { stateless: true });
    }
  });

  describe('when using version 4 of the generator', () => {

    const cssModSuffix = (useCssModules) => useCssModules ? '.cssmodule' : '';
    const importAssertion = (useCssModules, ext)  => useCssModules
      ? `import styles from './mycomponent.cssmodule.${ext}';`
      : `import './mycomponent.${ext}';`
      ;

    // List of available style types. Please add a line that says
    // testComponentWithStyle(styleTypes.KEY); to the bottom of the file
    // to run all unit tests for this filetype.
    const styleTypes = (useCssModules) => ({
      css: {
        type: 'css',
        fileName: `src/components/mycomponent${cssModSuffix(useCssModules)}.css`,
        expandedFileName: `src/components/my/littleSpecial/test${cssModSuffix(useCssModules)}.css`,
        assertions: {
          componentImport: importAssertion(useCssModules, 'css'),
          styleContent: '.mycomponent-component'
        }
      },
      sass: {
        type: 'sass',
        fileName: `src/components/mycomponent${cssModSuffix(useCssModules)}.sass`,
        expandedFileName: `src/components/my/littleSpecial/test${cssModSuffix(useCssModules)}.sass`,
        assertions: {
          componentImport: importAssertion(useCssModules, 'sass'),
          styleContent: '.mycomponent-component'
        }
      },
      scss: {
        type: 'scss',
        fileName: `src/components/mycomponent${cssModSuffix(useCssModules)}.scss`,
        expandedFileName: `src/components/my/littleSpecial/test${cssModSuffix(useCssModules)}.scss`,
        assertions: {
          componentImport: importAssertion(useCssModules, 'scss'),
          styleContent: '.mycomponent-component'
        }
      },
      less: {
        type: 'less',
        fileName: `src/components/mycomponent${cssModSuffix(useCssModules)}.less`,
        expandedFileName: `src/components/my/littleSpecial/test${cssModSuffix(useCssModules)}.less`,
        assertions: {
          componentImport: importAssertion(useCssModules, 'less'),
          styleContent: '.mycomponent-component'
        }
      },
      stylus: {
        type: 'stylus',
        fileName: `src/components/mycomponent${cssModSuffix(useCssModules)}.styl`,
        expandedFileName: `src/components/my/littleSpecial/test${cssModSuffix(useCssModules)}.styl`,
        assertions: {
          componentImport: importAssertion(useCssModules, 'styl'),
          styleContent: '.mycomponent-component'
        }
      }
    });

    /**
     * Return a newly generated component with given name and style
     * @param {String} name Name of the component
     * @param {String} styleType Styling language to use
     * @param {Object} options Options to use for the generator
     * @param {boolean} useCssModules useCssModules indicate whether to test with cssmodules enabled
     * @param {Function} callback Test callback to run
     */
    function createGeneratedComponent(name, styleType, options, useCssModules, callback) {
      helpers.run(generatorComponent)
        .withArguments([name])
        .withOptions(options)
        .on('ready', (instance) => {
          instance.config.set('style', styleType);
          instance.config.set('cssmodules', useCssModules);
          instance.config.set('generatedWithVersion', 4);
        })
        .on('end', callback);
    }

    /**
     * Test a component with styling applied
     * @param {Object} style The style to apply (see styleTypes above)
     * @param {Object} options Options to use [optional]
     * @param {boolean} useCssModules indicate whether to test with cssmodules enabled
     */
    function testComponentWithStyle(style, options, useCssModules) {

      // Make sure we always have options
      if(!options) {
        options = {};
      }

      const isStateless = options.stateless || false;
      const isPure = options.pure || false;
      const componentBase = isPure ? 'React.PureComponent' : 'React.Component';

      describe(`when using style type "${style.type}" with nostyle = false, pure rendering = ${isPure} and cssmodules = ${useCssModules}`, () => {

        describe('when writing is called', () => {

          it(`should create the react component, its ${style.type}-stylesheet and test file`, (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {

              assert.file([
                'src/components/Mycomponent.js',
                style.fileName,
                'test/components/MycomponentTest.js'
              ]);
              done();
            });
          });
        });

        describe('when creating a component', () => {

          it('should always import REACT', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent('src/components/Mycomponent.js', 'import React from \'react\';');
              done();
            });
          });

          it(`should require the created ${style.type} file`, (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent('src/components/Mycomponent.js', style.assertions.componentImport);
              done();
            });
          });

          // Only run this if we are not in stateless mode
          if(!isStateless) {
            it(`should extend ${componentBase}`, (done) => {
              createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
                assert.fileContent(
                  'src/components/Mycomponent.js',
                  `class Mycomponent extends ${componentBase}`
                );
                done();
              });
            });
          }

          it('should have its displayName set per default', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent('src/components/Mycomponent.js', 'Mycomponent.displayName = \'Mycomponent\';');
              done();
            });
          });

          it('should export the created component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {

              let exportAssertion;
              if(useCssModules) {
                exportAssertion = 'export default cssmodules(Mycomponent, styles);';
              } else {
                exportAssertion = 'export default Mycomponent;';
              }
              assert.fileContent('src/components/Mycomponent.js', exportAssertion);
              done();
            });
          });

          it('should be possible to create components in a subfolder', (done) => {
            createGeneratedComponent('my/little !special/test', style.type, options, useCssModules, () => {

              assert.file([
                'src/components/my/littleSpecial/Test.js',
                style.expandedFileName,
                'test/components/my/littleSpecial/TestTest.js'
              ]);
              done();
            });
          });

          it(`should add the components ${style.type} class to the created stylesheet`, (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent(style.fileName, style.assertions.styleContent);
              done();
            });
          });

          it('should create a unit test that imports the generated component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent('test/components/MycomponentTest.js', 'import Mycomponent from \'components/Mycomponent.js\';');
              done();
            });
          });
        });
      });
    }

    /**
     * Test a component with styling applied
     * @param {Object} style The style to apply (see styleTypes above)
     * @param {Object} options Options to use [optional]
     * @param {boolean} useCssModules indicate whether to test with cssmodules enabled
     */
    function testComponentWithoutStyle(style, options, useCssModules) {

      // Make sure we always have options
      if(!options) {
        options = {};
      }

      describe(`when using style type "${style.type}" with nostyle = true and cssmodules = ${useCssModules}`, () => {

        describe('when writing is called', () => {

          it('should create the react component and test file', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {

              assert.file([
                'src/components/Mycomponent.js',
                'test/components/MycomponentTest.js'
              ]);
              done();
            });
          });
        });

        describe('when creating a component', () => {

          it('should always import REACT', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent('src/components/Mycomponent.js', 'import React from \'react\';');
              done();
            });
          });

          it('should have its displayName set per default', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent('src/components/Mycomponent.js', 'Mycomponent.displayName = \'Mycomponent\';');
              done();
            });
          });

          it('should export the created component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent('src/components/Mycomponent.js', 'export default Mycomponent');
              done();
            });
          });

          it('should be possible to create components in a subfolder', (done) => {
            createGeneratedComponent('my/little !special/test', style.type, options, useCssModules, () => {

              assert.file([
                'src/components/my/littleSpecial/Test.js',
                'test/components/my/littleSpecial/TestTest.js'
              ]);
              done();
            });
          });

          it('should create a unit test that imports the generated component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, useCssModules, () => {
              assert.fileContent('test/components/MycomponentTest.js', 'import Mycomponent from \'components/Mycomponent.js\';');
              done();
            });
          });
        });
      });
    }

    // Run all tests for all available style types.
    // Stateless components will also be tested!
    for(const style in styleTypes(true)) {
      testComponentWithStyle(styleTypes(true)[style], {}, true);
      testComponentWithStyle(styleTypes(true)[style], { pure: true }, true);
      testComponentWithStyle(styleTypes(true)[style], { pure: false }, true);
      testComponentWithStyle(styleTypes(true)[style], { stateless: true }, true);
      testComponentWithoutStyle(styleTypes(true)[style], { nostyle: true }, true);
    }
    for(const style in styleTypes(false)) {
      testComponentWithStyle(styleTypes(false)[style], {}, false);
      testComponentWithStyle(styleTypes(false)[style], { pure: true }, false);
      testComponentWithStyle(styleTypes(false)[style], { pure: false }, false);
      testComponentWithStyle(styleTypes(false)[style], { stateless: true }, false);
      testComponentWithoutStyle(styleTypes(false)[style], { nostyle: true }, false);
    }
  });
});
