'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
};

util.inherits(ComponentGenerator, ScriptBase);

ComponentGenerator.prototype.createComponentFile = function createComponentFile() {
  this.option('es6');

  this.es6 = this.options.es6;

  this.generateComponentTestAndStyle(
    'Component',
    'spec/Component',
    'styles/Component',
    'components',
    true
  );
};
