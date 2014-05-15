'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var generalUtils = require('./util.js');

var Generator = module.exports = function Generator() {
	yeoman.generators.NamedBase.apply(this, arguments);

	// Add capitalize mixin
	this._.mixin({ 'capitalize': generalUtils.capitalize });
	this._.mixin({ 'lowercase': generalUtils.lowercase });

	this.appname = path.basename(process.cwd());

	this.appname = this._.slugify(this._.humanize(this.appname));
	this.scriptAppName = this._.camelize(this._.capitalize(this.appname)) + generalUtils.appName(this);
	this.classedName = this._.capitalize(this.name);

	if (typeof this.env.options.appPath === 'undefined') {
		this.env.options.appPath = this.env.options.appPath || 'src';
	}

	if (typeof this.env.options.testPath === 'undefined') {
		this.env.options.testPath = this.env.options.testPath || 'test/spec';
	}

	if (typeof this.env.options.stylesPath === 'undefined') {
		this.env.options.stylesPath = this.env.options.stylesPath || 'src/styles';
	}

	var sourceRoot = '/templates/';
	this.scriptSuffix = '.js';
	this.reactSuffix = '.jsx';

	var stylesRoot = '/templates/styles';
	this.stylesSuffix = '.css';

	this.sourceRoot(path.join(__dirname, sourceRoot));
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.appTemplate = function (src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [
		path.join('javascript', src + this.reactSuffix),
		path.join(this.env.options.appPath, dest) + this.reactSuffix
	]);
};

Generator.prototype.testTemplate = function (src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [
		src + this.scriptSuffix,
		path.join(this.env.options.testPath, dest) + this.scriptSuffix
	]);
};

Generator.prototype.stylesTemplate = function (src, dest) {
	console.log(src);
	yeoman.generators.Base.prototype.template.apply(this, [
		src + this.stylesSuffix,
		path.join(this.env.options.stylesPath, dest) + this.stylesSuffix
	]);
};

Generator.prototype.htmlTemplate = function (src, dest) {
	yeoman.generators.Base.prototype.template.apply(this, [
		src,
		path.join(this.env.options.appPath, dest.toLowerCase())
	]);
};

Generator.prototype.generateSourceAndTest = function (appTemplate, testTemplate, stylesTemplate, targetDirectory) {
	this.appTemplate(appTemplate, path.join('scripts', targetDirectory, this._.capitalize(this.name)));
	this.testTemplate(testTemplate, path.join(targetDirectory, this._.capitalize(this.name)));
	this.stylesTemplate(stylesTemplate, path.join(this._.capitalize(this.name)));
};
