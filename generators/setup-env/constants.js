'use strict';

const esDefaultOpts               = require('esformatter/lib/preset/default.json');

const esOpts = Object.assign({}, esDefaultOpts, {
  'lineBreak': {
    'before': {
      'AssignmentExpression': '>=2',
      'ClassDeclaration': 2,
      'EndOfFile': 1
    },
    'after': {
      'ClassClosingBrace': 2,
      'FunctionDeclaration': '>=2',
      'BlockStatementClosingBrace': '>=2'
    }
  }
});

module.exports = {
  esOpts
};
