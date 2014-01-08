/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;
var _ = require('underscore.string');

describe('react-webpack generator', function () {
    var react;

    beforeEach(function (done) {
        var deps = [
            '../../app',
            '../../common',
            '../../component',
            '../../main'
        ];
        helpers.testDirectory(path.join(__dirname, 'temp-test'), function (err) {
            if (err) {
                return done(err);
            }

            react = helpers.createGenerator('react-webpack:app', deps);
            react.options['skip-install'] = true;
            done();
        }.bind(this));
    });

    it('should generate dotfiles', function (done) {
        react.run({}, function () {
            helpers.assertFiles(['.gitignore', '.editorconfig', '.jshintrc']);
            done();
        });
    });

    it('creates expected files', function (done) {
        var expected = ['src/favicon.ico',
            'src/styles/reset.css',
            'src/styles/main.css',
            'src/index.html',
            'Gruntfile.js',
            'karma.conf.js',
            'package.json',
            'package.json',
            'src/scripts/components/TempTestApp.js',
            'test/helpers/phantomjs-shims.js',
            'test/helpers/react/addons.js'
        ];

        react.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

    /**
     * Generic test function that can be used to cover the scenarios where a generator is creating both a source file
     * and a test file. The function will run the respective generator, and then check for the existence of the two
     * generated files. A RegExp check is done on each file, checking for the generated content with a pattern.
     *
     * The number of parameters is quite huge due to the many options in which the generated files differ,
     * e.g. Components start with an upper case letter.
     *
     * The generated items all use the dummy name 'foo'.
     *
     * @param generatorType The type of generator to run, e.g. 'component'.
     * @param specType The type of the generated spec file, e.g. 'component'.
     * @param targetDirectory The directory into which the files are generated, e.g. 'components' - this will be
     *    located under 'src/scripts/components' for the sources and 'test/spec/components' for the tests.
     * @param scriptNameFn The function used to create the name of the created item, e.g. _.classify to generate 'Foo',
     *    or _.camelize to generate 'foo'.
     * @param specNameFn Same as scriptNameFn, but for the describe text used in the Spec file. Some generators use
     *    _.classify, others use _.camelize.
     * @param suffix An optional suffix to be appended to the generated item name.
     * @param done The done function.
     */

    function generatorTest(generatorType, specType, targetDirectory, scriptNameFn, specNameFn, suffix, done) {
        var reactGenerator;
        var name = 'Foo';
        var deps = [path.join('../..', generatorType)];
        reactGenerator = helpers.createGenerator('react-webpack:' + generatorType, deps, [name]);
        react.run([], function () {
            //var Foo = React.createClass({
            reactGenerator.run([], function () {
                helpers.assertFiles([
                    [path.join('src/scripts', targetDirectory, name + '.js'), new RegExp('var ' + scriptNameFn(name) + suffix, 'g')],
                    [path.join('test/spec', targetDirectory, name + '.js'), new RegExp('describe\\(\'' + specNameFn(name) + suffix + '\'', 'g')]
                ]);
                done();
            });
        });
    }

    describe('Component', function () {
        it('should generate a new component', function (done) {
          generatorTest('component', 'component', 'components', _.capitalize, _.capitalize, '', done);
        });
      });

});
