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
