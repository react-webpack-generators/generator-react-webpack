'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var generalUtils = require('./util.js');

var Generator = module.exports = function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);

	// Add capitalize mixin
  	this._.mixin({ 'capitalize': generalUtils.capitalize });

	this.appname = path.basename(process.cwd());

	this.appname = this._.slugify(this._.humanize(this.appname));
	this.scriptAppName = this._.capitalize(this.appname) + generalUtils.appName(this);
	this.classedName = this._.capitalize(this.name);

	if (typeof this.env.options.appPath === 'undefined') {
		this.env.options.appPath = this.env.options.appPath || 'src';
	}

	if (typeof this.env.options.testPath === 'undefined') {
		this.env.options.testPath = this.env.options.testPath || 'test/spec';
	}

	var sourceRoot = '/templates/javascript';
	this.scriptSuffix = '.js';

	this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function (src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [
		src + this.scriptSuffix,
		path.join(this.env.options.appPath, dest) + this.scriptSuffix
	]);
};

Generator.prototype.testTemplate = function (src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [
		src + this.scriptSuffix,
		path.join(this.env.options.testPath, dest) + this.scriptSuffix
	]);
};

Generator.prototype.htmlTemplate = function (src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [
		src,
		path.join(this.env.options.appPath, dest.toLowerCase())
	]);
};

Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, targetDirectory) {
	this.appTemplate(appTemplate, path.join('scripts', targetDirectory, this._.capitalize(this.name)));
	this.testTemplate(testTemplate, path.join(targetDirectory, this._.capitalize(this.name)));
};