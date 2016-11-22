'use strict';

const Generators = require('yeoman-generator');
const classify = require('underscore.string').classify;
const underscored = require('underscore.string').underscored;

const formatCode = require('./utils').formatCode;
const getModifiedConfigModuleIndex = require('./utils').getModifiedConfigModuleIndex;


class EnvGenerator extends Generators.Base {

  constructor(args, options) {
    super(args, options);

    this.argument('envName', { type: String, required: true });
  }

  configuring() {

    /**
     * Currently used major version of the generator (defaults to latest stable).
     * @type {number}
     */
    this.generatorVersion = this.config.get('generatedWithVersion') || 3;

    // Make sure we don't try to use this subgen on V3 or lower.
    if (this.generatorVersion < 4) {
      this.env.error('Setting up new envs is only supported in generator versions 4+');
    }
  }

  writing() {
    const classedEnv = classify(this.envName);
    const snakedEnv  = underscored(this.envName.toLowerCase());

    // Write conf/webpack/<EnvName>.js
    this.fs.copyTpl(
      this.templatePath(`${this.generatorVersion}/Env.js`),
      this.destinationPath(`conf/webpack/${classedEnv}.js`),
      { envName: snakedEnv }
    );

    // Write src/config/<env_name>.js
    this.fs.copyTpl(
      this.templatePath(`${this.generatorVersion}/runtimeConfig.js`),
      this.destinationPath(`src/config/${snakedEnv}.js`),
      { envName: snakedEnv }
    );

    // Write conf/webpack/index.js
    const moduleIndexPath = this.destinationPath('conf/webpack/index.js');
    const updatedModuleIndex = formatCode(
      getModifiedConfigModuleIndex(this.fs.read(moduleIndexPath), snakedEnv, classedEnv)
    );
    this.fs.write(this.destinationPath('conf/webpack/index.js'), formatCode(updatedModuleIndex));
  }

}

module.exports = EnvGenerator;
