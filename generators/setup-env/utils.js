'use strict';

const acorn = require('acorn');
const escodegen = require('escodegen');
const esformatter = require('esformatter');
const jp = require('jsonpath');

const esOpts = require('./constants').esOpts;


/**
 * Returns an AST Node for a {@code Property} in the {@code module.exports} object.
 *
 * @param {string} envName
 * @return {Object}
 */
function createExportNode(envName) {
  return {
    'type': 'Property',
    'method': false,
    'shorthand': true,
    'computed': false,
    'key': {
      'type': 'Identifier',
      'name': envName
    },
    'kind': 'init',
    'value': {
      'type': 'Identifier',
      'name': envName
    }
  }
}


/**
 * Returns updated index module requiring and exporting the newly created environment.
 *
 * @param {string} fileStr
 * @param {string} snakedEnv
 * @param {string} classedEnv
 * @return {string} file contents of updated conf/webpack/index.js
 */
function getModifiedConfigModuleIndex(fileStr, snakedEnv, classedEnv) {
  // TODO [sthzg] we might want to rewrite the AST-mods in this function using a walker.

  const moduleFileAst = acorn.parse(fileStr, { module: true });

  // if required env was already created, just return the original string
  if (jp.paths(moduleFileAst, `$..[?(@.value=="./${classedEnv}" && @.type=="Literal")]`).length > 0) {
    return fileStr;
  }

  // insert require call for the new env
  const envImportAst = acorn.parse(`const ${snakedEnv} = require('./${classedEnv}');`);
  const insertAt = jp.paths(moduleFileAst, '$..[?(@.name=="require")]').pop()[2] + 1;
  moduleFileAst.body.splice(insertAt, 0, envImportAst);

  // add new env to module.exports
  const exportsAt = jp.paths(moduleFileAst, '$..[?(@.name=="exports")]').pop()[2];
  moduleFileAst.body[exportsAt].expression.right.properties.push(createExportNode(snakedEnv));

  return escodegen.generate(moduleFileAst, { format: { indent: { style: '  ' } } });
}


/**
 * Returns a beautified representation of {@code fileStr}.
 *
 * @param {string} fileStr
 * @return {string}
 */
function formatCode(fileStr) {
  return esformatter.format(fileStr, esOpts);
}


module.exports = {
  createExportNode,
  formatCode,
  getModifiedConfigModuleIndex
};
