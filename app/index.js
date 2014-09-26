'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var generalUtils = require('../util.js');

var ReactWebpackGenerator = module.exports = function ReactWebpackGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.argument('appname', { type: String, required: false });
  this.appname = this.appname || path.basename(process.cwd());
  this.appname = this._.camelize(this._.slugify(this._.humanize(this.appname)));
  this.scriptAppName = this._.capitalize(this.appname) + generalUtils.appName(this);

  args = ['main'];

  if (typeof this.options.appPath === 'undefined') {
    this.options.appPath = this.options.appPath || 'src';
  }

  this.appPath = this.options.appPath;

  this.composeWith('react-webpack:common', {
    args: args
  });

  this.composeWith('react-webpack:main', {
    args: args
  });

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(ReactWebpackGenerator, yeoman.generators.Base);

ReactWebpackGenerator.prototype.welcome = function welcome() {
  // welcome message
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    console.log(
      'Out of the box I include Webpack and some default React components.\n'
    );
  }
};

ReactWebpackGenerator.prototype.askForReactRouter = function () {
  var done = this.async();
  this.prompt({
    type    : 'confirm',
    name    : 'reactRouter',
    message : 'Would you like to include react-router?',
    default : true
  }, function (props) {
    this.env.options.reactRouter = props.reactRouter;
    done();
  }.bind(this));
};

ReactWebpackGenerator.prototype.readIndex = function readIndex() {
  this.indexFile = this.engine(this.read('../../templates/common/index.html'), this);
};

ReactWebpackGenerator.prototype.createIndexHtml = function createIndexHtml() {
  this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

ReactWebpackGenerator.prototype.packageFiles = function () {
  this.reactRouter = this.env.options.reactRouter;
  this.template('../../templates/common/_package.json', 'package.json');
  this.copy('../../templates/common/Gruntfile.js', 'Gruntfile.js');
  this.copy('../../templates/common/gitignore', '.gitignore');
};

ReactWebpackGenerator.prototype.styleFiles = function styleFiles() {
  var mainFile = 'main.css';
  var normalizeFile = 'normalize.css';
  this.copy('styles/' + mainFile, 'src/styles/' + mainFile);
  this.copy('styles/' + normalizeFile, 'src/styles/' + normalizeFile);
};

ReactWebpackGenerator.prototype.imageFiles = function () {
  this.sourceRoot(path.join(__dirname, 'templates'));
  this.directory('images', 'src/images', true);
};

ReactWebpackGenerator.prototype.karmaFiles = function () {
  this.copy('../../templates/common/karma.conf.js', 'karma.conf.js');
};
