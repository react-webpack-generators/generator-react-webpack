'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var CommonGenerator = module.exports = function CommonGenerator(args, options, config) {
  yeoman.generators.NamedBase.apply(this, arguments);
};

util.inherits(CommonGenerator, yeoman.generators.NamedBase);

CommonGenerator.prototype.setupEnv = function setupEnv() {
  // Copies the contents of the generator `templates`
  // directory into your users new application path
  this.sourceRoot(path.join(__dirname, '../templates/common'));
  this.directory('root', '.', true);
};
