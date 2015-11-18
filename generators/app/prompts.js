'use strict';
let utils = require('../../utils/all');

module.exports = [
  {
    type: 'input',
    name: 'appName',
    message: 'Please choose your application name',
    default: utils.yeoman.getAppName()
  },
  {
    type: 'list',
    name: 'style',
    message: 'Which styles language you want to use?',
    choices: utils.config.getChoices('style'),
    default: utils.config.getDefaultChoice('style')
  },
  {
    type: 'confirm',
    name: 'postcss',
    message: 'Enable postcss?',
    default: false
  }
];
