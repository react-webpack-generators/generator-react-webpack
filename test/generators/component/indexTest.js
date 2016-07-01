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
              assert.fileContent('test/components/MycomponentComponentTest.js', 'import MycomponentComponent from \'components//MycomponentComponent.js\';');
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

    /**
     * @var {yeoman.generator} generator
     * Global generator instance, set by createGeneratedComponent
     */
    let generator;

    // List of available style types. Please add a line that says
    // testComponentWithStyle(styleTypes.KEY); to the bottom of the file
    // to run all unit tests for this filetype.
    const styleTypes = {
      css: {
        type: 'css',
        fileName: 'src/components/mycomponent.cssmodule.css',
        expandedFileName: 'src/components/my/littleSpecial/test.cssmodule.css',
        assertions: {
          componentImport: 'import styles from \'./mycomponent.cssmodule.css\';',
          styleContent: '.mycomponent-component'
        }
      },
      sass: {
        type: 'sass',
        fileName: 'src/components/Mycomponent.cssmodule.sass',
        expandedFileName: 'src/components/my/littleSpecial/test.cssmodule.sass',
        assertions: {
          componentImport: 'import styles from \'./mycomponent.cssmodule.sass\';',
          styleContent: '.mycomponent-component'
        }
      },
      scss: {
        type: 'scss',
        fileName: 'src/components/mycomponent.cssmodule.scss',
        expandedFileName: 'src/components/my/littleSpecial/test.cssmodule.scss',
        assertions: {
          componentImport: 'import styles from \'./mycomponent.cssmodule.scss\';',
          styleContent: '.mycomponent-component'
        }
      },
      less: {
        type: 'less',
        fileName: 'src/components/mycomponent.cssmodule.less',
        expandedFileName: 'src/components/my/littleSpecial/test.cssmodule.less',
        assertions: {
          componentImport: 'import styles from \'./mycomponent.cssmodule.less\';',
          styleContent: '.mycomponent-component'
        }
      },
      stylus: {
        type: 'stylus',
        fileName: 'src/components/mycomponent.cssmodule.styl',
        expandedFileName: 'src/components/my/littleSpecial/test.cssmodule.styl',
        assertions: {
          componentImport: 'import styles from \'./mycomponent.cssmodule.styl\';',
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
          instance.config.set('generatedWithVersion', 4);
          generator = instance;
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

      describe(`when using style type "${style.type}" including with nostyle set to false`, () => {

        describe('when writing is called', () => {

          it(`should create the react component, its ${style.type}-stylesheet and test file`, (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {

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
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('src/components/Mycomponent.js', 'import React from \'react\';');
              done();
            });
          });

          it(`should require the created ${style.type} file`, (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('src/components/Mycomponent.js', style.assertions.componentImport);
              done();
            });
          });

          it('should have its displayName set per default', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('src/components/Mycomponent.js', 'Mycomponent.displayName = \'Mycomponent\';');
              done();
            });
          });

          it('should export the created component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {

              let exportAssertion;
              if(generator.options.stateless) {
                exportAssertion = 'export default cssmodules(Mycomponent, styles);';
              } else {
                exportAssertion = 'export default Mycomponent';
              }
              assert.fileContent('src/components/Mycomponent.js', exportAssertion);
              done();
            });
          });

          it('should be possible to create components in a subfolder', (done) => {
            createGeneratedComponent('my/little !special/test', style.type, options, () => {

              assert.file([
                'src/components/my/littleSpecial/Test.js',
                style.expandedFileName,
                'test/components/my/littleSpecial/TestTest.js'
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
              assert.fileContent('test/components/MycomponentTest.js', 'import Mycomponent from \'components//Mycomponent.js\';');
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
     */
    function testComponentWithoutStyle(style, options) {

      // Make sure we always have options
      if(!options) {
        options = {};
      }

      describe(`when using style type "${style.type}" with nostyle set to true`, () => {

        describe('when writing is called', () => {

          it('should create the react component, and test file', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {

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
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('src/components/Mycomponent.js', 'import React from \'react\';');
              done();
            });
          });

          it('should have its displayName set per default', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('src/components/Mycomponent.js', 'Mycomponent.displayName = \'Mycomponent\';');
              done();
            });
          });

          it('should export the created component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('src/components/Mycomponent.js', 'export default Mycomponent');
              done();
            });
          });

          it('should be possible to create components in a subfolder', (done) => {
            createGeneratedComponent('my/little !special/test', style.type, options, () => {

              assert.file([
                'src/components/my/littleSpecial/Test.js',
                'test/components/my/littleSpecial/TestTest.js'
              ]);
              done();
            });
          });

          it('should create a unit test that imports the generated component', (done) => {
            createGeneratedComponent('mycomponent', style.type, options, () => {
              assert.fileContent('test/components/MycomponentTest.js', 'import Mycomponent from \'components//Mycomponent.js\';');
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
      testComponentWithoutStyle(styleTypes[style], { nostyle: true });
    }
  });
});
