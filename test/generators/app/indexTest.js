'use strict';
let path = require('path');
let expect = require('chai').expect;
let assert = require('yeoman-generator').assert;
let helpers = require('yeoman-generator').test

describe('react-webpack:app', () => {

  let defaultPrompts = require('../../../generators/app/prompts.js');
  let prompts = {};
  for(let p of defaultPrompts) {
    prompts[p.name] = p.default;
  }

  let generator;
  let generatorBase = path.join(__dirname, '../../../generators/app');

  before((done) => {

    helpers.run(generatorBase)
      .inTmpDir()
      .withOptions({
        'skip-welcome-message': true,
        'skip-install': true
      })
      .withPrompts(prompts)
      .on('ready', (instance) => {
        generator = instance;
      })
      .on('end', done);
  });

  describe('#config', () => {

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
        'cfg/base.js',
        'cfg/dev.js',
        'cfg/dist.js',
        'cfg/test.js',
        'server.js',
        'webpack.config.js'
      ]);
    });

    it('should generate required source files', () => {

      assert.file([
        'src/actions/README.md',
        'src/components/Main.js',
        'src/components/run.js',
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

describe('react-webpack:app non-default-prompts', () => {

  let defaultPrompts = require('../../../generators/app/prompts.js');
  let prompts = {};
  for(let p of defaultPrompts) {
    prompts[p.name] = p.default;
  }

  prompts.postcss = true;

  let generator;
  let generatorBase = path.join(__dirname, '../../../generators/app');

  before((done) => {

    helpers.run(generatorBase)
      .inTmpDir()
      .withOptions({
        'skip-welcome-message': true,
        'skip-install': true
      })
      .withPrompts(prompts)
      .on('ready', (instance) => {
        generator = instance;
      })
      .on('end', done);
  });

  describe('#config', () => {

    it('should use "css" as default style language', () => {
      expect(generator.config.get('style')).to.equal('css');
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
        'cfg/dev.js',
        'cfg/dist.js',
        'cfg/test.js',
        'server.js',
        'webpack.config.js'
      ]);
    });

    it('should insert the postcss loader into the style pipes', () => {

      assert.fileContent('cfg/base.js', 'loader: \'style!css!postcss-loader\'');
      //assert.fileContent('cfg/base.js', 'loader: \'style-loader!css-loader!postcss-loader\'');
      assert.fileContent('cfg/base.js', 'loader: \'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded&indentedSyntax\'');
      assert.fileContent('cfg/base.js', 'loader: \'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded\'');
      assert.fileContent('cfg/base.js', 'loader: \'style-loader!css-loader!postcss-loader!less-loader\'');
      assert.fileContent('cfg/base.js', 'loader: \'style-loader!css-loader!postcss-loader!stylus-loader\'');
    });

    it('should append the postcss function to the base config', () => {

      assert.fileContent('cfg/base.js', ',\n  postcss: function () {\n    return [];\n  }');
    });

    it('should generate required source files', () => {

      assert.file([
        'src/actions/README.md',
        'src/components/Main.js',
        'src/components/run.js',
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
