'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var MainGenerator = module.exports = function MainGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
};

util.inherits(MainGenerator, ScriptBase);

MainGenerator.prototype.createAppFile = function createAppFile() {
  this.appTemplate('App', 'scripts/components/'+this.scriptAppName);
};
