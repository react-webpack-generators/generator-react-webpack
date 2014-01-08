'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ComponentGenerator = module.exports = function ComponentGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
};

util.inherits(ComponentGenerator, ScriptBase);

ComponentGenerator.prototype.createComponentFile = function createComponentFile() {
  this.generateSourceAndTest(
    'Component',
    'spec/Component',
    'components'
  );
};
