'use strict';
const Generators = require('yeoman-generator');
let utils = require('../../utils/all');

class ComponentGenerator extends Generators.Base {

  constructor(args, options) {

    super(args, options);
    this.argument('name', { type: String, required: true });
    this.option('stateless', {
      desc: 'Create a stateless component instead of a full one',
      defaults: false
    });
  }

  writing() {

    let settings = utils.yeoman.getAllSettingsFromComponentName(this.name, this.config.get('style'));
    let componentType = this.options.stateless ? 'Stateless' : 'Base';

    // Set the template base. If it cannot be guessed,
    // use files from the default directory. If it cannot be
    // guessed, assume we have something REALLY REALLY old here...
    let templateBase = this.config.get('generatedWithVersion');
    if(!templateBase) {
      templateBase = 3;
    }

    // Create the style template
    this.fs.copyTpl(
      this.templatePath(`${templateBase}/styles/Component${settings.style.suffix}`),
      this.destinationPath(settings.style.path + settings.style.fileName),
      settings
    );

    // Create the component
    this.fs.copyTpl(
      this.templatePath(`${templateBase}/components/${componentType}.js`),
      this.destinationPath(settings.component.path + settings.component.fileName),
      settings
    );

    // Create the unit test
    this.fs.copyTpl(
      this.templatePath(`${templateBase}/tests/Base.js`),
      this.destinationPath(settings.test.path + settings.test.fileName),
      settings
    );
  }
}

module.exports = ComponentGenerator;
