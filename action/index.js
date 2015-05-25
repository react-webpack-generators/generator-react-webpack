'use strict';
var util = require('util');
var ScriptBase = require('../script-base.js');

var ActionGenerator = module.exports = function ActionGenerator(args, options, config) {
  if (!args[0]) console.log('\n Please specify a name for this action creator \n');
  else {
    args[0] += 'ActionCreators';
    ScriptBase.apply(this, arguments)
  }
};

util.inherits(ActionGenerator, ScriptBase);

ActionGenerator.prototype.createActionFile = function createActionFile() {
  this.option('es6');
  this.es6 = this.options.es6;

  var actionTemplate;
  switch (this.architecture){
    case 'flux':
          actionTemplate = 'FluxAction';
          break;
    case 'reflux':
          actionTemplate = 'RefluxAction';
          break;
    case 'alt':
          actionTemplate = 'AltAction';
          break;
  }

  console.log('Creating ' + this.architecture + ' action');

  this.generateSourceAndTest(
    actionTemplate,
    'spec/Action',
    'actions'
  );
};
