'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ActionGenerator = module.exports = function ActionGenerator(args, options, config) {
  args[0] += 'Store';
  ScriptBase.apply(this, arguments);
}

util.inherits(ActionGenerator, ScriptBase);

ActionGenerator.prototype.createActionFile = function createActionFile() {
  this.option('es6');

  this.es6 = this.options.es6;
  this.dispatcherName = this._.capitalizeFile(this.config.get('app-name')) + 'AppDispatcher';

  this.generateSourceAndTest(
    'Store',
    'spec/Store',
    void(0),
    'stores',
    false
  );
}
