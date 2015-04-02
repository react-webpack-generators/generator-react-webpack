/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-generator').assert;
var _ = require('underscore.string');

describe('react-webpack generator', function() {
  var react;
  var expected = [
    'src/favicon.ico',
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
          '.yo-rc.json',
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
            'src/scripts/components/TempTestApp.js',
            'src/scripts/components/main.js'
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

    it('should use HMR webpack API inside of configs', function (done) {
      react.run({}, function() {
        assert.fileContent([
            ['package.json', /react-hot-loader/],
            ['Gruntfile.js', /hot:\s*true/],
            ['webpack.config.js', /react-hot/],
            ['webpack.config.js', /webpack\.HotModuleReplacementPlugin/],
            ['webpack.config.js', /webpack\.NoErrorsPlugin/],
            ['webpack.config.js', /webpack\/hot\/only-dev-server/]
        ]);
        done();
      });
    });

    it('should generate JS config with aliases', function(done) {
      react.run({}, function() {
        assert.fileContent([
            // style aliases
            ['webpack.config.js', /resolve[\S\s]+alias[\S\s]+styles/m],
            ['karma.conf.js', /resolve[\S\s]+alias[\S\s]+styles/m],
            ['webpack.dist.config.js', /resolve[\S\s]+alias[\S\s]+styles/m],
            // script/components aliases
            ['webpack.config.js', /resolve[\S\s]+alias[\S\s]+components/m],
            ['karma.conf.js', /resolve[\S\s]+alias[\S\s]+components/m],
            ['webpack.dist.config.js', /resolve[\S\s]+alias[\S\s]+components/m]
        ]);
        done();
      });
    });

    it('should not have any flux assets configured', function(done) {
      react.run({}, function() {
        assert.noFileContent([
          ['package.json', /flux/],
          ['package.json', /events/],
          ['package.json', /object-assign/],
          ['karma.conf.js', /resolve[\S\s]+alias[\S\s]+stores/m],
          ['webpack.config.js', /resolve[\S\s]+alias[\S\s]+stores/m],
          ['webpack.dist.config.js', /resolve[\S\s]+alias[\S\s]+stores/m]
        ]);

        assert.noFile('src/scripts/dispatcher/TempTestAppDispatcher.js');

        done();
      });
    });
  });

  describe('Generator', function () {

    it('should contain info about used style lang', function (done) {
      react.run({}, function() {
        assert.ok(react.config.get('styles-language'));
        done();
      });
    });

    it('by default should use css style lang', function (done) {
      react.run({}, function() {
        assert.equal(react.config.get('styles-language'), 'css');
        done();
      });
    });

    var assertStyle = function (lang, done) {
      helpers.mockPrompt(react, {
        stylesLanguage: lang
      });
      react.run({}, function() {
        assert.equal(react.config.get('styles-language'), lang);
        done();
      });
    };

    it('should use sass style lang', function (done) {
      assertStyle('sass', done);
    });

    it('should use scss style lang', function (done) {
      assertStyle('scss', done);
    });

    it('should use less style lang', function (done) {
      assertStyle('less', done);
    });

    it('should use stylus style lang', function (done) {
      assertStyle('stylus', done);
    });

  });

  describe('When using Flux', function() {

    beforeEach(function(done) {
      helpers.mockPrompt(react, {
        flux: true
      });

      react.run({}, function() {
        done();
      })
    });

    it('should add flux, events, and object-assign packages', function(done) {
      assert.fileContent([
        ['package.json', /flux/],
        ['package.json', /events/],
        ['package.json', /object-assign/]
      ]);

      done();
    });

    it('should add stores and actions alias to karma config', function(done) {
      assert.fileContent([
        ['karma.conf.js', /resolve[\S\s]+alias[\S\s]+stores/m]
      ]);

      done();
    });

    it('should add stores and actions alias to webpack configs', function(done) {
      assert.fileContent([
        ['webpack.config.js', /resolve[\S\s]+alias[\S\s]+stores/m],
        ['webpack.dist.config.js', /resolve[\S\s]+alias[\S\s]+stores/m]
      ]);

      done();
    });

    it('should have a Dispatcher generated', function(done) {
      setTimeout(function(){
        assert.file('src/scripts/dispatcher/TempTestAppDispatcher.js');

        done();
      });
    })
  });

  describe('When generating a Component', function() {
    var generatorTest = function(name, generatorType, specType, targetDirectory, scriptNameFn, specNameFn, suffix, done) {

      var deps = [path.join('../..', generatorType)];
      genOptions.appPath = 'src/scripts'

      var reactGenerator = helpers.createGenerator('react-webpack:' + generatorType, deps, [name], genOptions);

      react.run([], function() {
        reactGenerator.run([], function() {
          helpers.assertFileContent([

            [path.join('src/scripts', targetDirectory, name + '.js'), new RegExp('var ' + scriptNameFn(name) + suffix, 'g')],
            [path.join('src/scripts', targetDirectory, name + '.js'), new RegExp('require\\(\'styles\\/' + name + suffix + '\\.[^\']+' + '\'\\)', 'g')],
            [path.join('test/spec', targetDirectory, 'TempTestApp' + '.js'), new RegExp('require\\(\'components\\/' + 'TempTestApp' + suffix + '\\.[^\']+' + '\'\\)', 'g')],
            [path.join('test/spec', targetDirectory, name + '.js'), new RegExp('require\\(\'components\\/' + name + suffix + '\\.[^\']+' + '\'\\)', 'g')],
            [path.join('test/spec', targetDirectory, name + '.js'), new RegExp('describe\\(\'' + specNameFn(name) + suffix + '\'', 'g')]

          ]);
          done();
        });
      });
    }

    it('should generate a new component', function(done) {
      react.run({}, function() {
        generatorTest('Foo', 'component', 'component', 'components', _.capitalize, _.capitalize, '', done);
      });
    });

    it('should generate a subcomponent', function(done) {
      react.run({}, function() {
        var subComponentNameFn = function () { return 'Bar'; };
        generatorTest('Foo/Bar', 'component', 'component', 'components', subComponentNameFn, subComponentNameFn, '', done);
      });
    });

  });

  describe('When generating an Action', function() {

    beforeEach(function(done){
      helpers.mockPrompt(react, {
        flux: true
      });

      react.run({}, function() {
        var generator =
          helpers.createGenerator(
            'react-webpack:action',
            [path.join('../../action')],
            ['Test'],
            { appPath: 'src/scripts' }
          );

        react.run([], function() {
          generator.run([], function() {
            done();
          })
        });
      });
    });

    it('should generate a new action with tests', function(done) {
      assert.fileContent([
        ['src/scripts/actions/TestActionCreators.js', /var TestActionCreators/g],
        ['test/spec/actions/TestActionCreators.js', /require\('actions\/TestActionCreators.js'\)/g],
        ['test/spec/actions/TestActionCreators.js', /describe\('TestActionCreators'/g]
      ]);

      done();
    });
  });

  describe('When generating a Store', function() {

    beforeEach(function(done) {
      helpers.mockPrompt(react, {
        flux: true
      });

      react.run({}, function() {
        var generator =
          helpers.createGenerator(
            'react-webpack:store',
            [path.join('../../store')],
            ['Test'],
            { appPath: 'src/scripts' }
          );

        react.run([], function() {
          generator.run([], function() {
            done();
          });
        });
      });
    });

    it('should generate a new store with tests', function(done) {
      assert.fileContent([
        ['src/scripts/stores/TestStore.js', /var TestStore/g],
        ['test/spec/stores/TestStore.js', /require\('stores\/TestStore.js'\)/g],
        ['test/spec/stores/TestStore.js', /describe\('TestStore'/g]
      ]);

      done();
    });
  });
});
