'use strict';
let path = require('path');
let assert = require('yeoman-generator').assert;
let helpers = require('yeoman-generator').test

describe('react-webpack:component', () => {

  let generatorComponent = path.join(__dirname, '../../../generators/component');

  /**
   * Return a newly generated component with given name and style
   * @param {String} name
   * @param {String} styleType
   * @param {Function} callback
   */
  function createGeneratedComponent(name, styleType, callback) {
    helpers.run(generatorComponent)
      .withArguments([name])
      .on('ready', (instance) => {
        instance.config.set('style', styleType);
      })
      .on('end', callback);
  }

  describe('When using style type "css"', () => {

    describe('Setup', () => {

      it('should create the react component, its stylesheet and test file', (done) => {
        createGeneratedComponent('mycomponent', 'css', () => {

          assert.file([
            'src/components/MycomponentComponent.js',
            'src/styles/Mycomponent.css',
            'test/components/MycomponentComponentTest.js'
          ]);
          done();
        });
      });
    });

    describe('Component', () => {

      it('should require the created css file', (done) => {
        createGeneratedComponent('mycomponent', 'css', () => {
          assert.fileContent('src/components/MycomponentComponent.js', 'require(\'styles//Mycomponent.css\');');
          done();
        });
      });

      it('should have its displayName set per default', (done) => {

        createGeneratedComponent('mycomponent', 'css', () => {
          assert.fileContent('src/components/MycomponentComponent.js', `displayName = 'MycomponentComponent';`);
          done();
        });
      });
    });

    describe('Style', () => {

      it('should add the components css class to the stylesheet', (done) => {
        createGeneratedComponent('mycomponent', 'css', () => {
          assert.fileContent('src/styles/Mycomponent.css', '.mycomponent-component');
          done();
        });
      });
    });

    describe('Test', () => {

      it('should import the react component', (done) => {
        createGeneratedComponent('mycomponent', 'css', () => {
          assert.fileContent('test/components/MycomponentComponentTest.js', 'import MycomponentComponent from \'components//MycomponentComponent.js\';');
          done();
        });
      });
    });
  }); // End css

  describe('When creating a component in a subfolder', () => {

    describe('Setup', () => {

      it('should create the react component, its stylesheet and test file', (done) => {
        createGeneratedComponent('my/little !special/test', 'css', () => {

          assert.file([
            'src/components/my/littleSpecial/TestComponent.js',
            'src/styles/my/littleSpecial/Test.css',
            'test/components/my/littleSpecial/TestComponentTest.js'
          ]);
          done();
        });
      });
    });
  }); // End css (subfolder)

  describe('When using style type "sass"', () => {

    describe('Setup', () => {

      it('should create the react component, its stylesheet and test file', (done) => {
        createGeneratedComponent('mycomponent', 'sass', () => {

          assert.file([
            'src/components/MycomponentComponent.js',
            'src/styles/Mycomponent.sass',
            'test/components/MycomponentComponentTest.js'
          ]);
          done();
        });
      });
    });

    describe('Component', () => {

      it('should require the created sass file', (done) => {
        createGeneratedComponent('mycomponent', 'sass', () => {
          assert.fileContent('src/components/MycomponentComponent.js', 'require(\'styles//Mycomponent.sass\');');
          done();
        });
      });
    });

    describe('Style', () => {

      it('should add the components sass class to the stylesheet', (done) => {
        createGeneratedComponent('mycomponent', 'sass', () => {
          assert.fileContent('src/styles/Mycomponent.sass', '.mycomponent-component');
          done();
        });
      });
    });

    describe('Test', () => {

      it('should import the react component', (done) => {
        createGeneratedComponent('mycomponent', 'sass', () => {
          assert.fileContent('test/components/MycomponentComponentTest.js', 'import MycomponentComponent from \'components//MycomponentComponent.js\';');
          done();
        });
      });
    });
  }); // End sass

  describe('When using style type "scss"', () => {

    describe('Setup', () => {

      it('should create the react component, its stylesheet and test file', (done) => {
        createGeneratedComponent('mycomponent', 'scss', () => {

          assert.file([
            'src/components/MycomponentComponent.js',
            'src/styles/Mycomponent.scss',
            'test/components/MycomponentComponentTest.js'
          ]);
          done();
        });
      });
    });

    describe('Component', () => {

      it('should require the created scss file', (done) => {
        createGeneratedComponent('mycomponent', 'scss', () => {
          assert.fileContent('src/components/MycomponentComponent.js', 'require(\'styles//Mycomponent.scss\');');
          done();
        });
      });
    });

    describe('Style', () => {

      it('should add the components scss class to the stylesheet', (done) => {
        createGeneratedComponent('mycomponent', 'scss', () => {
          assert.fileContent('src/styles/Mycomponent.scss', '.mycomponent-component');
          done();
        });
      });
    });

    describe('Test', () => {

      it('should import the react component', (done) => {
        createGeneratedComponent('mycomponent', 'scss', () => {
          assert.fileContent('test/components/MycomponentComponentTest.js', 'import MycomponentComponent from \'components//MycomponentComponent.js\';');
          done();
        });
      });
    });
  }); // End scss

  describe('When using style type "less"', () => {

    describe('Setup', () => {

      it('should create the react component, its stylesheet and test file', (done) => {
        createGeneratedComponent('mycomponent', 'less', () => {

          assert.file([
            'src/components/MycomponentComponent.js',
            'src/styles/Mycomponent.less',
            'test/components/MycomponentComponentTest.js'
          ]);
          done();
        });
      });
    });

    describe('Component', () => {

      it('should require the created less file', (done) => {
        createGeneratedComponent('mycomponent', 'less', () => {
          assert.fileContent('src/components/MycomponentComponent.js', 'require(\'styles//Mycomponent.less\');');
          done();
        });
      });
    });

    describe('Style', () => {

      it('should add the components less class to the stylesheet', (done) => {
        createGeneratedComponent('mycomponent', 'less', () => {
          assert.fileContent('src/styles/Mycomponent.less', '.mycomponent-component');
          done();
        });
      });
    });

    describe('Test', () => {

      it('should import the react component', (done) => {
        createGeneratedComponent('mycomponent', 'less', () => {
          assert.fileContent('test/components/MycomponentComponentTest.js', 'import MycomponentComponent from \'components//MycomponentComponent.js\';');
          done();
        });
      });
    });
  }); // End less

  describe('When using style type "stylus"', () => {

    describe('Setup', () => {

      it('should create the react component, its stylesheet and test file', (done) => {
        createGeneratedComponent('mycomponent', 'stylus', () => {

          assert.file([
            'src/components/MycomponentComponent.js',
            'src/styles/Mycomponent.styl',
            'test/components/MycomponentComponentTest.js'
          ]);
          done();
        });
      });
    });

    describe('Component', () => {

      it('should require the created stylus file', (done) => {
        createGeneratedComponent('mycomponent', 'stylus', () => {
          assert.fileContent('src/components/MycomponentComponent.js', 'require(\'styles//Mycomponent.styl\');');
          done();
        });
      });
    });

    describe('Style', () => {

      it('should add the components stylus class to the stylesheet', (done) => {
        createGeneratedComponent('mycomponent', 'stylus', () => {
          assert.fileContent('src/styles/Mycomponent.styl', '.mycomponent-component');
          done();
        });
      });
    });

    describe('Test', () => {

      it('should import the react component', (done) => {
        createGeneratedComponent('mycomponent', 'less', () => {
          assert.fileContent('test/components/MycomponentComponentTest.js', 'import MycomponentComponent from \'components//MycomponentComponent.js\';');
          done();
        });
      });
    });
  }); // End stylus

});
