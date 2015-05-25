'use strict';

var util = require('util');
var ScriptBase = require('../script-base.js');

var MainGenerator = module.exports = function MainGenerator(args, options, config) {
  ScriptBase.apply(this, arguments);
};

util.inherits(MainGenerator, ScriptBase);

MainGenerator.prototype.createAppFile = function createAppFile(scriptAppName) {
  this.reactRouter = this.env.options.reactRouter;
  this.scriptAppName = scriptAppName;
  this.appTemplate('App', 'components/' + scriptAppName);
  this.testTemplate('spec/App', 'components/' + scriptAppName);
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

MainGenerator.prototype.createAltjsFile = function createAltjsFile() {
  if(this.env.options.architecture=='alt') {
    this.appTemplate('alt', 'alt');
  }
};
