'use strict';

const acorn = require('acorn');
const assert = require('yeoman-assert');
const fs = require('fs-extra');
const helpers = require('yeoman-test');
const path = require('path');
const walk = require('acorn/dist/walk');


/**
 * Returns absolute path to (sub-)generator with {@code name}.
 * @param {string} name
 */
const genpath = (name) =>
  path.join(__dirname, '../../../generators', name);

/**
 * A mocked generator config object.
 * @type {{appName: string, style: string, cssmodules: boolean, postcss: boolean, generatedWithVersion: number}}
 */
const cfg = {
  appName: 'testCfg',
  style: 'css',
  cssmodules: false,
  postcss: false,
  generatedWithVersion: 4
};


describe('react-webpack:setup-env', function () {

  describe('react-webpack:setup-env foobar', function () {
    before(function () {
      return helpers
        .run(genpath('setup-env'))
        .withArguments(['foobar'])
        .withLocalConfig(cfg)
        .inTmpDir(function (dir) {
          fs.copySync(
            path.join(__dirname, 'assets/moduleIndex.js'),
            path.join(dir, 'conf/webpack/index.js')
          );
        })
        .toPromise();
    });

    it('creates env files', function () {
      assert.file(['conf/webpack/Foobar.js']);
      assert.file(['src/config/foobar.js']);
    });

    it('requires the new env in conf/webpack/index.js', function () {
      assert.fileContent(
        'conf/webpack/index.js',
        /const foobar = require\('\.\/Foobar'\)/
      );
    });

    it('exports the new env from conf/webpack/index.js', function () {
      const fileStr = fs.readFileSync('conf/webpack/index.js').toString();
      const ast = acorn.parse(fileStr);

      let found = false;
      walk.simple(ast, {
        'Property': (node) => {
          if (node.key.name === 'foobar' && node.value.name === 'foobar') {
            found = true;
          }
        }
      });

      assert(found, 'Did not find a key and value of `foobar` on the module.exports AST node');
    });
  });

});
