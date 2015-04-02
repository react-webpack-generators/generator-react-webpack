'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ActionGenerator = module.exports = function ActionGenerator(args, options, config) {
  args[0] += 'ActionCreators';
  ScriptBase.apply(this, arguments);
}

util.inherits(ActionGenerator, ScriptBase);

ActionGenerator.prototype.createActionFile = function createActionFile() {
  this.option('es6');

  this.es6 = this.options.es6;

  console.log(this.name);

  this.generateSourceAndTest(
    'Action',
    'spec/Action',
    void(0),
    'actions',
    false
  );
}
