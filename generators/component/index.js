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

    this.option('nostyle', {
      desc: 'Create a component without creating an associated style',
      defaults: false
    });
  }

  writing() {

    // Set the template base. If it cannot be guessed,
    // use files from the default directory. In this case,
    // assume we have something REALLY REALLY old here...
    let generatorVersion = this.config.get('generatedWithVersion');
    if(!generatorVersion) {
      generatorVersion = 3;
    }

    const componentType = this.options.stateless ? 'Stateless' : 'Base';
    const componentHasStyles = !this.options.nostyle;

    // Get the
    const settings = utils.yeoman.getAllSettingsFromComponentName(this.name, this.config.get('style'), generatorVersion);
    settings.componentHasStyles = componentHasStyles;

    // Create the style template. Skipped if nostyle is set as command line flag
    if(componentHasStyles) {
      this.fs.copyTpl(
        this.templatePath(`${generatorVersion}/styles/Component${settings.style.suffix}`),
        this.destinationPath(settings.style.path + settings.style.fileName),
        settings
      );
    }

    // Create the component
    this.fs.copyTpl(
      this.templatePath(`${generatorVersion}/components/${componentType}.js`),
      this.destinationPath(settings.component.path + settings.component.fileName),
      settings
    );

    // Create the unit test
    this.fs.copyTpl(
      this.templatePath(`${generatorVersion}/tests/Base.js`),
      this.destinationPath(settings.test.path + settings.test.fileName),
      settings
    );
  }
}

module.exports = ComponentGenerator;
