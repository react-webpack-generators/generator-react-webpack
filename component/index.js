'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');
var genUtil = require('../util');

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
};

util.inherits(ComponentGenerator, ScriptBase);

ComponentGenerator.prototype.createComponentFile = function createComponentFile() {

  this.option('rich');
  this.rich = this.options.rich;

  // Build the require path for the layout file
  this.stylePath = genUtil.getLayoutFilePath(this.classedFileName, this.stylesLanguage);

  this.generateComponentTestAndStyle(
    'Component',
    'spec/Component',
    'styles/Component',
    'components',
    true
  );
};
