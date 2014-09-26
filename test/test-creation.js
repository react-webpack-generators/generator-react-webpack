/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');

describe('react-webpack generator', function() {
  var react;
  var expected = [
    'src/favicon.ico',
    'src/styles/normalize.css',
    'src/styles/main.css',
    'src/index.html',
    'Gruntfile.js',
    'webpack.config.js',
    'karma.conf.js',
    'package.json'
  ];
  var mockPrompts = {};
  var genOptions = {
    'appPath': 'src',
    'skip-install': true,
    'skip-welcome-message': true,
    'skip-message': true
  };
  var deps = [
    '../../app',
    '../../common',
    '../../component',
    '../../main'
  ];

  beforeEach(function(done) {
    helpers.testDirectory(path.join(__dirname, 'temp-test'), function(err) {
      if (err) {
        return done(err);
      }
      react = helpers.createGenerator('react-webpack:app', deps, false, genOptions);
      helpers.mockPrompt(react, mockPrompts);

      done();
    });
  });

  describe('App files', function() {
    it('should generate dotfiles', function(done) {
      react.run({}, function() {
        helpers.assertFile([].concat(expected, [
          '.editorconfig',
          '.gitignore',
          '.jshintrc'
        ]));
        done();
      });
    });

    it('should generate app files', function(done) {
      react.run({}, function() {
        // TODO: Hack, no time to work out why generated
        // files not present at point of test...
        setTimeout(function() {
          helpers.assertFile(expected);
          done();
        });
      });
    });

    it('should generate expected JS files', function(done) {
      react.run({}, function() {
        setTimeout(function() {
          helpers.assertFile([].concat(expected, [
            'src/scripts/components/TempTestApp.jsx',
            'src/scripts/components/main.jsx'
          ]));
          done();
        });
      });
    });

    it('should generate expected test JS files', function(done) {
      react.run({}, function() {
        // TODO: Hack, no time to work out why generated
        // files not present at point of test...
        setTimeout(function() {
          helpers.assertFile([].concat(expected, [
            'test/helpers/phantomjs-shims.js',
            'test/helpers/react/addons.js',
            'test/spec/components/TempTestApp.js'
          ]));
          done();
        });
      });
    });

  });

  describe('Subgenerators', function() {
    var generatorTest = function(generatorType, specType, targetDirectory, scriptNameFn, specNameFn, suffix, done) {

      var name = 'Foo';
      var deps = [path.join('../..', generatorType)];
      genOptions.appPath += '/scripts'

      var reactGenerator = helpers.createGenerator('react-webpack:' + generatorType, deps, [name], genOptions);

      react.run([], function() {
        reactGenerator.run([], function() {
          helpers.assertFileContent([

            [path.join('src/scripts', targetDirectory, name + '.jsx'), new RegExp('var ' + scriptNameFn(name) + suffix, 'g')],
            [path.join('test/spec', targetDirectory, name + '.js'), new RegExp('describe\\(\'' + specNameFn(name) + suffix + '\'', 'g')]

          ]);
          done();
        });
      });
    }

    it('should generate a new component', function(done) {
      react.run({}, function() {
        generatorTest('component', 'component', 'components', _.capitalize, _.capitalize, '', done);
      });
    });

  });

});
