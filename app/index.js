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

  if (typeof this.env.options.appPath === 'undefined') {
    this.env.options.appPath = this.env.options.appPath || 'src';
  }

  this.appPath = this.env.options.appPath;

  this.hookFor('react-webpack:common', {
    args: args
  });

  this.hookFor('react-webpack:main', {
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

ReactWebpackGenerator.prototype.readIndex = function readIndex() {
  this.indexFile = this.engine(this.read('../../templates/common/index.html'), this);
};

ReactWebpackGenerator.prototype.createIndexHtml = function createIndexHtml() {
  this.indexFile = this.indexFile.replace(/&apos;/g, "'");
  this.write(path.join(this.appPath, 'index.html'), this.indexFile);
};

ReactWebpackGenerator.prototype.packageFiles = function () {
  this.template('../../templates/common/_package.json', 'package.json');
  this.copy('../../templates/common/Gruntfile.js', 'Gruntfile.js');
  this.copy('../../templates/common/gitignore', '.gitignore');
};

ReactWebpackGenerator.prototype.styleFiles = function styleFiles() {
  var mainFile = 'main.css';
  var resetFile = 'reset.css';
  this.copy('styles/' + mainFile, 'src/styles/' + mainFile);
  this.copy('styles/' + resetFile, 'src/styles/' + resetFile);
};

ReactWebpackGenerator.prototype.imageFiles = function () {
  this.sourceRoot(path.join(__dirname, 'templates'));
  this.directory('images', 'src/images', true);
};

ReactWebpackGenerator.prototype.karmaFiles = function () {
  this.copy('../../templates/common/karma.conf.js', 'karma.conf.js');
};
