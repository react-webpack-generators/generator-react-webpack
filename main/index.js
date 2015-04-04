'use strict';

var util = require('util');
var ScriptBase = require('../script-base.js');

var MainGenerator = module.exports = function MainGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
};

util.inherits(MainGenerator, ScriptBase);

MainGenerator.prototype.createAppFile = function createAppFile() {
  this.reactRouter = this.env.options.reactRouter;
  this.appTemplate('App', 'components/' + this.scriptAppName);
  this.testTemplate('spec/App', 'components/' + this.scriptAppName);
};

MainGenerator.prototype.createMainFile = function createMainFile() {
  if(this.env.options.reactRouter) {
    this.appTemplate('main', 'components/main');
  }
};

MainGenerator.prototype.createDispatcher = function createDispatcher() {
  if(this.env.options.architecture=='flux') {
    this.appTemplate('Dispatcher', 'dispatcher/' + this.scriptAppName + 'Dispatcher');
  }
};
