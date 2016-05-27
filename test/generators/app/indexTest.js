'use strict';
let path = require('path');
let expect = require('chai').expect;
let assert = require('yeoman-assert');
let helpers = require('yeoman-test');

// Default globals, used in all tests
const defaultPrompts = require('../../../generators/app/prompts.js');
const generatorBase = path.join(__dirname, '../../../generators/app');

let generator;

/**
 * Global before load function. Run in the before callbacks
 * @param  {Object} prompts List of prompts to use
 * @return {Promise}
 */
const beforeLoad = (prompts) => {

  return helpers.run(generatorBase)
    .inTmpDir()
    .withOptions({
      'skip-welcome-message': true,
      'skip-install': true
    })
    .withPrompts
    (prompts)
    .on('ready', function(instance) {
      generator = instance;
    })
    .toPromise();
};

describe('react-webpack:app', () => {

  let prompts = {};
  for(let p of defaultPrompts) {
    prompts[p.name] = p.default;
  }

  before(() => {
    return beforeLoad(prompts);
  });

  describe('#config', () => {

    it('should set the generatedWith key to the current generator major version', () => {
      expect(generator.config.get('generatedWithVersion')).to.equal(4);
    });

    it('should use "css" as default style language', () => {
      expect(generator.config.get('style')).to.equal('css');
    });

    it('should not enable "PostCSS" by default', () => {
      expect(generator.config.get('postcss')).to.equal(false);
    });
  });

  describe('#createFiles', () => {

    it('should generate dot files', () => {

      assert.file([
        '.babelrc',
        '.editorconfig',
        '.eslintrc',
        '.gitignore',
        '.yo-rc.json'
      ]);
    });

    it('should generate project configuration files', () => {

      assert.file([
        'package.json'
      ]);
    });

    it('should generate the webpack configuration', () => {

      assert.file([
        'conf/webpack/Base.js',
        'conf/webpack/Dev.js',
        'conf/webpack/Dist.js',
        'conf/webpack/Test.js',
        'webpack.config.js'
      ]);
    });

    it('should generate required source files', () => {

      assert.file([
        'src/actions/README.md',
        'src/index.js',
        'src/components/App.js',
        'src/components/app.css',
        'src/favicon.ico',
        'src/images/yeoman.png',
        'src/index.html',
        'src/sources/README.md',
        'src/stores/README.md'
      ]);
    });

    it('should generate test configuration and basic tests', () => {

      assert.file([
        'karma.conf.js',
        'test/components/AppTest.js',
        'test/config/ConfigTest.js',
        'test/loadtests.js',
        'test/.eslintrc'
      ]);
    });
  });
});

describe.skip('react-webpack:app with PostCSS support', () => {

  let prompts = {};
  for(let p of defaultPrompts) {
    prompts[p.name] = p.default;
  }

  prompts.postcss = true;

  describe('#config', () => {

    it('should set the generatedWith key to the current generator major version', () => {
      expect(generator.config.get('generatedWithVersion')).to.equal(4);
    });

    it('should use "css" as default style language', () => {
      expect(generator.config.get('style')).to.equal('css');
    });

    it('should enable "PostCSS"', () => {
      expect(generator.config.get('postcss')).to.equal(true);
    });
  });

  describe('#createFiles', () => {

    it('should generate dot files', () => {

      assert.file([
        '.babelrc',
        '.editorconfig',
        '.eslintrc',
        '.gitignore',
        '.yo-rc.json'
      ]);
    });

    it('should generate project configuration files', () => {

      assert.file([
        'package.json'
      ]);
    });

    it('should generate the webpack configuration', () => {

      assert.file([
        'cfg/base.js',
        'cfg/defaults.js',
        'cfg/dev.js',
        'cfg/dist.js',
        'cfg/test.js',
        'server.js',
        'webpack.config.js'
      ]);
    });

    it('should insert the postcss loader into the style pipes', () => {

      assert.fileContent('cfg/defaults.js', 'loader: \'style-loader!css-loader!postcss-loader\'');
      assert.fileContent('cfg/defaults.js', 'loader: \'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax\'');
      assert.fileContent('cfg/defaults.js', 'loader: \'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded\'');
      assert.fileContent('cfg/defaults.js', 'loader: \'style-loader!css-loader!postcss-loader!less-loader\'');
      assert.fileContent('cfg/defaults.js', 'loader: \'style-loader!css-loader!postcss-loader!stylus-loader\'');
    });

    it('should append the postcss function to the base config', () => {

      assert.fileContent('cfg/defaults.js', ',\n  postcss: function () {\n    return [];\n  }');
    });

    it('should generate required source files', () => {

      assert.file([
        'src/actions/README.md',
        'src/index.js',
        'src/components/Main.js',
        'src/favicon.ico',
        'src/images/yeoman.png',
        'src/index.html',
        'src/sources/README.md',
        'src/stores/README.md',
        'src/styles/App.css'
      ]);
    });

    it('should generate test configuration and basic tests', () => {

      assert.file([
        'karma.conf.js',
        'test/components/MainTest.js',
        'test/helpers/shallowRenderHelper.js',
        'test/loadtests.js'
      ]);
    });
  });
});
