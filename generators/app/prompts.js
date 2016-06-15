'use strict';
const utils = require('../../utils/all');

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
    message: 'Which style language do you want to use?',
    choices: utils.config.getChoices('style'),
    default: utils.config.getDefaultChoice('style')
  },
  {
    type: 'confirm',
    name: 'cssmodules',
    message: 'Enable css module support? See https://github.com/gajus/react-css-modules for further info',
    default: true
  },
  {
    type: 'confirm',
    name: 'postcss',
    message: 'Enable postcss?',
    default: false
  }
];
